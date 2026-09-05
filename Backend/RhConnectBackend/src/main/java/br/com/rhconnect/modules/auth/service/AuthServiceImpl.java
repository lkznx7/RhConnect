package br.com.rhconnect.modules.auth.service;

import br.com.rhconnect.modules.auth.dto.AuthResponse;
import br.com.rhconnect.modules.auth.dto.LoginRequest;
import br.com.rhconnect.modules.auth.dto.RegisterRequest;
import br.com.rhconnect.modules.auth.entity.RefreshToken;
import br.com.rhconnect.modules.auth.entity.RoleUser;
import br.com.rhconnect.modules.auth.entity.Usuario;
import br.com.rhconnect.modules.auth.repository.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class AuthServiceImpl implements AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;

    public AuthServiceImpl(UsuarioRepository usuarioRepository,
                           PasswordEncoder passwordEncoder,
                           AuthenticationManager authenticationManager,
                           TokenProvider tokenProvider) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
    }

    @Override
    public AuthResponse login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email(), request.senha()));
        Usuario usuario = (Usuario) authentication.getPrincipal();
        String accessToken = tokenProvider.genereteAcessToken(usuario.getEmail());
        return buildResponse(accessToken, usuario);
    }

    @Override
    public AuthResponse register(RegisterRequest request) {
        if (usuarioRepository.findByEmail(request.email()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "E-mail já cadastrado");
        }
        if (usuarioRepository.findByCpf(request.cpf()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "CPF já cadastrado");
        }

        Usuario usuario = new Usuario();
        usuario.setNomeCompleto(request.nomeCompleto());
        usuario.setEmail(request.email());
        usuario.setCpf(request.cpf());
        usuario.setTelefone(request.telefone());
        usuario.setSenhaHash(passwordEncoder.encode(request.senha()));
        usuario.setRole(request.role() != null ? request.role() : RoleUser.CANDIDATO);
        usuario.setAtivo(true);
        usuarioRepository.save(usuario);

        String accessToken = tokenProvider.genereteAcessToken(usuario.getEmail());
        return buildResponse(accessToken, usuario);
    }

    private AuthResponse buildResponse(String accessToken, Usuario usuario) {
        long expiresIn = tokenProvider.getClaims(accessToken).getExpiration().getTime() - System.currentTimeMillis();
        return new AuthResponse(
                accessToken,
                "Bearer",
                expiresIn,
                new AuthResponse.UserResponse(
                        usuario.getId(),
                        usuario.getNomeCompleto(),
                        usuario.getEmail(),
                        usuario.getRole()
                )
        );
    }

    @Override
    public RefreshToken gerarRefreshToken(String username) {
        return tokenProvider.genereteRefreshToken(username);
    }

    @Override
    public Boolean validaRefreshToken(String token) {
        return tokenProvider.validaRefreshToken(token);
    }

    @Override
    public void revogaRefreshToken(String token) {
        tokenProvider.revogaRefreshToken(token);
    }

    @Override
    public Boolean verificaRefreshTokenUsado(String token) {
        return tokenProvider.verificaRefreshTokenUsado(token);
    }

    @Override
    public RefreshToken rotacionarRefreshToken(String token) {
        return tokenProvider.rotacionarRefreshToken(token);
    }
}