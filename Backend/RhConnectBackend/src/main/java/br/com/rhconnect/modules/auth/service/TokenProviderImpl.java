package br.com.rhconnect.modules.auth.service;

import br.com.rhconnect.modules.auth.config.JwtProperties;
import br.com.rhconnect.modules.auth.entity.RefreshToken;
import br.com.rhconnect.modules.auth.repository.RefreshTokenRepository;
import br.com.rhconnect.modules.auth.repository.UsuarioRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import javax.crypto.Mac;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;
import java.util.UUID;


@Service
public class TokenProviderImpl implements TokenProvider {

    UsuarioRepository usuarioRepository;
    JwtProperties jwtProperties;

    RefreshTokenRepository refreshTokenRepository;

    public TokenProviderImpl(UsuarioRepository usuarioRepository, JwtProperties jwtProperties, RefreshTokenRepository refreshTokenRepository) {
        this.usuarioRepository = usuarioRepository;
        this.jwtProperties = jwtProperties;
        this.refreshTokenRepository = refreshTokenRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return usuarioRepository.findByEmail(username).orElseThrow(() -> new UsernameNotFoundException("usuario não encontrado"));
    }

    @Override
    public Optional<UserDetails> findUserByUsername(String username) {
        return usuarioRepository.findByEmail(username).map(user -> (UserDetails) user);
    }

    @Override
    public String genereteAcessToken(String username) {
        return Jwts.builder().header().keyId(jwtProperties.getActiveKid()).and()
                .subject(loadUserByUsername(username).getUsername()).issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + jwtProperties.getExpirationMs()))
                .claim("roles", loadUserByUsername(username).getAuthorities()).signWith(singInKey()).compact();
    }

    @Override
    public String sign(String payload) {
        try {
            Mac mac = Mac.getInstance("HmacSHA256");
            mac.init(singInKey());
            return Base64.getUrlEncoder().withoutPadding()
                    .encodeToString(mac.doFinal(payload.getBytes(StandardCharsets.UTF_8)));
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public RefreshToken genereteRefreshToken(String username) {

        var user = usuarioRepository.findByEmail(username);

        long expiry = System.currentTimeMillis() + jwtProperties.getRefreshExpirationMs();
        String refreshToken = Jwts.builder().header().keyId(jwtProperties.getActiveKid()).and()
                .id(UUID.randomUUID().toString()).subject(username).issuedAt(new Date())
                .expiration(new Date(expiry))
                .signWith(singInKey()).compact();

        RefreshToken rt = new RefreshToken(user.get(), refreshToken, expiry);
        refreshTokenRepository.save(rt);
        return rt;
    }

    @Override
    public Claims getClaims(String token) {
        return Jwts.parser().keyLocator(header -> {
            String kid = header instanceof io.jsonwebtoken.ProtectedHeader protectedHeader
                    ? protectedHeader.getKeyId()
                    : null;
            return chavePorKid(kid);
        }).build().parseSignedClaims(token).getPayload();
    }

    private SecretKey chavePorKid(String kid) {
        if (kid != null && jwtProperties.getKeys() != null && jwtProperties.getKeys().containsKey(kid)) {
            return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtProperties.getKeys().get(kid)));
        }
        String ativa = jwtProperties.getActiveKid();
        if (jwtProperties.getKeys() != null && jwtProperties.getKeys().containsKey(ativa)) {
            return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtProperties.getKeys().get(ativa)));
        }
        throw new IllegalStateException("Nenhuma chave JWT configurada para kid=" + kid);
    }

    @Override
    public String getUsername(String token) {
        return getClaims(token).getSubject();
    }

    @Override
    public String getRole(String token) {
        return getClaims(token).get("roles", String.class);
    }

    @Override
    public Boolean validateToken(String token) {
        try {
            getClaims(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    @Override
    public SecretKey singInKey() {
        return chavePorKid(jwtProperties.getActiveKid());
    }

    @Override
    public Boolean validaRefreshToken(String token) {

        try {
            getClaims(token);
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }

        var refreshTokenOpt = refreshTokenRepository.findByToken(token);
        if (refreshTokenOpt.isEmpty()) {
            return false;
        }

        var rt = refreshTokenOpt.get();

        if (rt.isRevoked()) {
            return false;
        }

        if (rt.isUsed()) {
            return false;
        }

        if (rt.getExpiryDate() < System.currentTimeMillis()) {
            return false;
        }

        return true;
    }

    @Override
    public RefreshToken getRefreshToken(String token) {
        return refreshTokenRepository.findByToken(token).orElse(null);
    }

    @Override
    public void revogaRefreshToken(String token) {
        var rt = refreshTokenRepository.findByToken(token).orElse(null);
        if (rt != null) {
            rt.setRevoked(true);
            refreshTokenRepository.save(rt);
        }
    }

    @Override
    public Boolean verificaRefreshTokenUsado(String token) {
        return refreshTokenRepository.findByToken(token).map(RefreshToken::isUsed).orElse(false);
    }

    @Override
    public RefreshToken rotacionarRefreshToken(String token) {
        var refreshTokenOpt = refreshTokenRepository.findByTokenWithUsuario(token);
        if (refreshTokenOpt.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Refresh token não encontrado");
        }

        var rt = refreshTokenOpt.get();

        if (rt.isRevoked()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token revogado");
        }

        if (rt.getExpiryDate() < System.currentTimeMillis()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token expirado");
        }

        if (rt.isUsed()) {
            refreshTokenRepository.revokeAllByFamilyId(rt.getFamilyId());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Refresh token já utilizado - possível reuso");
        }

        rt.setUsed(true);
        refreshTokenRepository.save(rt);

        return gerarTokenDaMesmaFamilia(rt);
    }

    private RefreshToken gerarTokenDaMesmaFamilia(RefreshToken antigo) {
        String username = getClaims(antigo.getToken()).getSubject();

        long expiry = System.currentTimeMillis() + jwtProperties.getRefreshExpirationMs();
        String novoToken = Jwts.builder().header().keyId(jwtProperties.getActiveKid()).and()
                .id(UUID.randomUUID().toString()).subject(username).issuedAt(new Date())
                .expiration(new Date(expiry))
                .signWith(singInKey()).compact();

        RefreshToken novo = new RefreshToken(antigo.getUsuario(), novoToken, expiry, antigo.getFamilyId());
        refreshTokenRepository.save(novo);
        return novo;
    }

}