package br.com.rhconnect.modules.auth.service;

import br.com.rhconnect.modules.auth.config.JwtProperties;
import br.com.rhconnect.modules.auth.entity.RefreshToken;
import br.com.rhconnect.modules.auth.entity.RoleUser;
import br.com.rhconnect.modules.auth.entity.Usuario;
import br.com.rhconnect.modules.auth.repository.RefreshTokenRepository;
import br.com.rhconnect.modules.auth.repository.UsuarioRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TokenProviderImplTest {

    private static final String SECRET = "rclwaD/cMgOAIZFVt2rqf8KVXw3D+ALgku0ghEnyJWg=";
    private static final String OUTRO_SECRET = "QIzcZis13LG/mbv4KjV5g9gM3hu2nB8QZs/u6BiDGV4=";

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private RefreshTokenRepository refreshTokenRepository;

    private TokenProviderImpl tokenProvider;

    @BeforeEach
    void setUp() {
        tokenProvider = new TokenProviderImpl(usuarioRepository, properties("k1", Map.of("k1", SECRET)), refreshTokenRepository);
    }

    @Test
    void deveGerarEValidarAccessToken() {
        Usuario usuario = usuario("teste@rh.com");
        when(usuarioRepository.findByEmail("teste@rh.com")).thenReturn(Optional.of(usuario));

        String token = tokenProvider.genereteAcessToken("teste@rh.com");

        assertThat(token).isNotBlank();
        assertThat(tokenProvider.validateToken(token)).isTrue();

        Claims claims = tokenProvider.getClaims(token);
        assertThat(claims.getSubject()).isEqualTo("teste@rh.com");
        assertThat(tokenProvider.getUsername(token)).isEqualTo("teste@rh.com");
    }

    @Test
    void deveRejeitarTokenInvalido() {
        assertThat(tokenProvider.validateToken("token.invalido")).isFalse();
    }

    @Test
    void deveRejeitarTokenAssinadoComChaveDesconhecida() {
        Usuario usuario = usuario("teste@rh.com");
        when(usuarioRepository.findByEmail("teste@rh.com")).thenReturn(Optional.of(usuario));

        TokenProviderImpl outroProvider = new TokenProviderImpl(
                usuarioRepository, properties("k9", Map.of("k9", OUTRO_SECRET)), refreshTokenRepository);
        String token = outroProvider.genereteAcessToken("teste@rh.com");

        assertThat(tokenProvider.validateToken(token)).isFalse();
    }

    @Test
    void tokenAntigoContinuaValidoQuandoTrocaAKidAtiva() {
        Usuario usuario = usuario("teste@rh.com");
        when(usuarioRepository.findByEmail("teste@rh.com")).thenReturn(Optional.of(usuario));

        String tokenComK1 = tokenProvider.genereteAcessToken("teste@rh.com");

        TokenProviderImpl depoisDaRotacao = new TokenProviderImpl(
                usuarioRepository, properties("k2", Map.of("k1", SECRET, "k2", OUTRO_SECRET)), refreshTokenRepository);

        assertThat(depoisDaRotacao.validateToken(tokenComK1)).isTrue();
    }

    @Test
    void novoTokenAssinadoComNovaChaveContinuaValidoParaQuemTemHistorico() {
        Usuario usuario = usuario("teste@rh.com");
        when(usuarioRepository.findByEmail("teste@rh.com")).thenReturn(Optional.of(usuario));

        TokenProviderImpl antesDaRotacao = new TokenProviderImpl(
                usuarioRepository, properties("k1", Map.of("k1", SECRET, "k2", OUTRO_SECRET)), refreshTokenRepository);
        TokenProviderImpl depoisDaRotacao = new TokenProviderImpl(
                usuarioRepository, properties("k2", Map.of("k1", SECRET, "k2", OUTRO_SECRET)), refreshTokenRepository);

        String tokenComK2 = depoisDaRotacao.genereteAcessToken("teste@rh.com");

        assertThat(antesDaRotacao.validateToken(tokenComK2)).isTrue();
        assertThat(depoisDaRotacao.validateToken(tokenComK2)).isTrue();
    }

    @Test
    void deveLancarUsernameNotFoundQuandoUsuarioNaoExiste() {
        when(usuarioRepository.findByEmail("nao.existe@rh.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> tokenProvider.loadUserByUsername("nao.existe@rh.com"))
                .isInstanceOf(org.springframework.security.core.userdetails.UsernameNotFoundException.class);
    }

    @Test
    void deveGerarRefreshTokenEPersistir() {
        Usuario usuario = usuario("teste@rh.com");
        when(usuarioRepository.findByEmail("teste@rh.com")).thenReturn(Optional.of(usuario));

        RefreshToken rt = tokenProvider.genereteRefreshToken("teste@rh.com");

        assertThat(rt).isNotNull();
        assertThat(rt.getToken()).isNotBlank();
        assertThat(rt.getUsuario()).isEqualTo(usuario);
        assertThat(rt.getFamilyId()).isNotNull();
        assertThat(rt.isRevoked()).isFalse();
        assertThat(rt.isUsed()).isFalse();
        assertThat(rt.getExpiryDate()).isGreaterThan(System.currentTimeMillis());
        verify(refreshTokenRepository).save(rt);
    }

    @Test
    void refreshTokenGeradoContemUsernameNoSubject() {
        Usuario usuario = usuario("teste@rh.com");
        when(usuarioRepository.findByEmail("teste@rh.com")).thenReturn(Optional.of(usuario));

        RefreshToken rt = tokenProvider.genereteRefreshToken("teste@rh.com");

        assertThat(tokenProvider.getUsername(rt.getToken())).isEqualTo("teste@rh.com");
    }

    @Test
    void deveLancarQuandoUsuarioNaoExisteAoGerarRefreshToken() {
        when(usuarioRepository.findByEmail("nao.existe@rh.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> tokenProvider.genereteRefreshToken("nao.existe@rh.com"))
                .isInstanceOf(NoSuchElementException.class);
    }

    @Test
    void deveValidarRefreshTokenValido() {
        String token = refreshTokenValido();
        RefreshToken rt = refreshToken("teste@rh.com", token, System.currentTimeMillis() + 900_000);
        when(refreshTokenRepository.findByToken(token)).thenReturn(Optional.of(rt));

        assertThat(tokenProvider.validaRefreshToken(token)).isTrue();
    }

    @Test
    void deveRejeitarRefreshTokenRevogado() {
        String token = refreshTokenValido();
        RefreshToken rt = refreshToken("teste@rh.com", token, System.currentTimeMillis() + 900_000);
        rt.setRevoked(true);
        when(refreshTokenRepository.findByToken(token)).thenReturn(Optional.of(rt));

        assertThat(tokenProvider.validaRefreshToken(token)).isFalse();
    }

    @Test
    void deveRejeitarRefreshTokenUsado() {
        String token = refreshTokenValido();
        RefreshToken rt = refreshToken("teste@rh.com", token, System.currentTimeMillis() + 900_000);
        rt.setUsed(true);
        when(refreshTokenRepository.findByToken(token)).thenReturn(Optional.of(rt));

        assertThat(tokenProvider.validaRefreshToken(token)).isFalse();
    }

    @Test
    void deveRejeitarRefreshTokenExpirado() {
        String token = refreshTokenValido();
        RefreshToken rt = refreshToken("teste@rh.com", token, System.currentTimeMillis() - 1_000);
        when(refreshTokenRepository.findByToken(token)).thenReturn(Optional.of(rt));

        assertThat(tokenProvider.validaRefreshToken(token)).isFalse();
    }

    @Test
    void deveRejeitarRefreshTokenNaoEncontradoNoBanco() {
        String token = refreshTokenValido();
        when(refreshTokenRepository.findByToken(token)).thenReturn(Optional.empty());

        assertThat(tokenProvider.validaRefreshToken(token)).isFalse();
    }

    @Test
    void deveRejeitarRefreshTokenComAssinaturaInvalida() {
        assertThat(tokenProvider.validaRefreshToken("token.invalido")).isFalse();
    }

    @Test
    void deveRejeitarRefreshTokenComJwtExpirado() {
        String tokenExpirado = Jwts.builder().subject("teste@rh.com")
                .issuedAt(new Date(System.currentTimeMillis() - 2_000))
                .expiration(new Date(System.currentTimeMillis() - 1_000))
                .signWith(tokenProvider.singInKey()).compact();

        assertThat(tokenProvider.validaRefreshToken(tokenExpirado)).isFalse();
    }

    @Test
    void deveRejeitarRefreshTokenAssinadoComChaveDesconhecida() {
        Usuario usuario = usuario("teste@rh.com");
        when(usuarioRepository.findByEmail("teste@rh.com")).thenReturn(Optional.of(usuario));

        TokenProviderImpl outroProvider = new TokenProviderImpl(
                usuarioRepository, properties("k9", Map.of("k9", OUTRO_SECRET)), refreshTokenRepository);
        String token = outroProvider.genereteRefreshToken("teste@rh.com").getToken();

        assertThat(tokenProvider.validaRefreshToken(token)).isFalse();
    }

    @Test
    void deveRetornarRefreshTokenExistente() {
        RefreshToken rt = refreshToken("teste@rh.com", "token", System.currentTimeMillis() + 900_000);
        when(refreshTokenRepository.findByToken("token")).thenReturn(Optional.of(rt));

        assertThat(tokenProvider.getRefreshToken("token")).isEqualTo(rt);
    }

    @Test
    void deveRetornarNullQuandoRefreshTokenNaoExiste() {
        when(refreshTokenRepository.findByToken("nao.existe")).thenReturn(Optional.empty());

        assertThat(tokenProvider.getRefreshToken("nao.existe")).isNull();
    }

    @Test
    void deveRevogarRefreshToken() {
        String token = "token";
        RefreshToken rt = refreshToken("teste@rh.com", token, System.currentTimeMillis() + 900_000);
        when(refreshTokenRepository.findByToken(token)).thenReturn(Optional.of(rt));

        tokenProvider.revogaRefreshToken(token);

        assertThat(rt.isRevoked()).isTrue();
        verify(refreshTokenRepository).save(rt);
    }

    @Test
    void naoFazNadaQuandoRefreshTokenNaoExisteAoRevogar() {
        String token = "nao.existe";
        when(refreshTokenRepository.findByToken(token)).thenReturn(Optional.empty());

        tokenProvider.revogaRefreshToken(token);

        verify(refreshTokenRepository, never()).save(any(RefreshToken.class));
    }

    @Test
    void deveInformarRefreshTokenUsado() {
        String token = "token";
        RefreshToken rt = refreshToken("teste@rh.com", token, System.currentTimeMillis() + 900_000);
        rt.setUsed(true);
        when(refreshTokenRepository.findByToken(token)).thenReturn(Optional.of(rt));

        assertThat(tokenProvider.verificaRefreshTokenUsado(token)).isTrue();
    }

    @Test
    void deveInformarRefreshTokenNaoUsado() {
        String token = "token";
        RefreshToken rt = refreshToken("teste@rh.com", token, System.currentTimeMillis() + 900_000);
        when(refreshTokenRepository.findByToken(token)).thenReturn(Optional.of(rt));

        assertThat(tokenProvider.verificaRefreshTokenUsado(token)).isFalse();
    }

    @Test
    void deveInformarFalsoQuandoRefreshTokenNaoExisteAoVerificarUsado() {
        when(refreshTokenRepository.findByToken("nao.existe")).thenReturn(Optional.empty());

        assertThat(tokenProvider.verificaRefreshTokenUsado("nao.existe")).isFalse();
    }

    @Test
    void deveRotacionarRefreshTokenValido() {
        RefreshToken rt = refreshToken("teste@rh.com", refreshTokenValido(), System.currentTimeMillis() + 900_000);
        when(refreshTokenRepository.findByTokenWithUsuario(rt.getToken())).thenReturn(Optional.of(rt));

        RefreshToken novo = tokenProvider.rotacionarRefreshToken(rt.getToken());

        assertThat(novo).isNotNull();
        assertThat(novo.getToken()).isNotBlank();
        assertThat(novo.getToken()).isNotEqualTo(rt.getToken());
        assertThat(novo.getFamilyId()).isEqualTo(rt.getFamilyId());
        assertThat(novo.isUsed()).isFalse();
        assertThat(novo.isRevoked()).isFalse();
        assertThat(rt.isUsed()).isTrue();
        verify(refreshTokenRepository).save(novo);
        verify(refreshTokenRepository, never()).revokeAllByFamilyId(any());
    }

    @Test
    void deveDetectarReusoERevogarFamiliaInteira() {
        RefreshToken rt = refreshToken("teste@rh.com", refreshTokenValido(), System.currentTimeMillis() + 900_000);
        rt.setUsed(true);
        when(refreshTokenRepository.findByTokenWithUsuario(rt.getToken())).thenReturn(Optional.of(rt));

        assertThatThrownBy(() -> tokenProvider.rotacionarRefreshToken(rt.getToken()))
                .isInstanceOf(ResponseStatusException.class)
                .extracting(e -> ((ResponseStatusException) e).getStatusCode().value())
                .isEqualTo(HttpStatus.UNAUTHORIZED.value());

        verify(refreshTokenRepository).revokeAllByFamilyId(rt.getFamilyId());
    }

    @Test
    void deveRejeitarRotacaoDeTokenRevogado() {
        RefreshToken rt = refreshToken("teste@rh.com", refreshTokenValido(), System.currentTimeMillis() + 900_000);
        rt.setRevoked(true);
        when(refreshTokenRepository.findByTokenWithUsuario(rt.getToken())).thenReturn(Optional.of(rt));

        assertThatThrownBy(() -> tokenProvider.rotacionarRefreshToken(rt.getToken()))
                .isInstanceOf(ResponseStatusException.class)
                .extracting(e -> ((ResponseStatusException) e).getStatusCode().value())
                .isEqualTo(HttpStatus.UNAUTHORIZED.value());

        verify(refreshTokenRepository, never()).revokeAllByFamilyId(any());
    }

    @Test
    void deveRejeitarRotacaoDeTokenExpirado() {
        RefreshToken rt = refreshToken("teste@rh.com", refreshTokenValido(), System.currentTimeMillis() - 1_000);
        when(refreshTokenRepository.findByTokenWithUsuario(rt.getToken())).thenReturn(Optional.of(rt));

        assertThatThrownBy(() -> tokenProvider.rotacionarRefreshToken(rt.getToken()))
                .isInstanceOf(ResponseStatusException.class)
                .extracting(e -> ((ResponseStatusException) e).getStatusCode().value())
                .isEqualTo(HttpStatus.UNAUTHORIZED.value());

        verify(refreshTokenRepository, never()).revokeAllByFamilyId(any());
    }

    @Test
    void deveRejeitarRotacaoQuandoTokenNaoEncontrado() {
        when(refreshTokenRepository.findByTokenWithUsuario("nao.existe")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> tokenProvider.rotacionarRefreshToken("nao.existe"))
                .isInstanceOf(ResponseStatusException.class)
                .extracting(e -> ((ResponseStatusException) e).getStatusCode().value())
                .isEqualTo(HttpStatus.BAD_REQUEST.value());
    }

    private String refreshTokenValido() {
        Usuario usuario = usuario("teste@rh.com");
        when(usuarioRepository.findByEmail("teste@rh.com")).thenReturn(Optional.of(usuario));
        return tokenProvider.genereteRefreshToken("teste@rh.com").getToken();
    }

    private Usuario usuario(String email) {
        Usuario usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setRole(RoleUser.CANDIDATO);
        return usuario;
    }

    private RefreshToken refreshToken(String email, String token, long expiryDate) {
        RefreshToken rt = new RefreshToken(usuario(email), token, expiryDate);
        rt.setIdRefreshToken(UUID.randomUUID());
        return rt;
    }

    private JwtProperties properties(String activeKid, Map<String, String> keys) {
        JwtProperties properties = new JwtProperties();
        properties.setActiveKid(activeKid);
        properties.setKeys(keys);
        properties.setExpirationMs(900_000);
        properties.setRefreshExpirationMs(900_000L * 168);
        return properties;
    }
}