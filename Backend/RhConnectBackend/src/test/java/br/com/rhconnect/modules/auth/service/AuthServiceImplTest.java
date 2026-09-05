package br.com.rhconnect.modules.auth.service;

import br.com.rhconnect.modules.auth.dto.AuthResponse;
import br.com.rhconnect.modules.auth.dto.LoginRequest;
import br.com.rhconnect.modules.auth.dto.RegisterRequest;
import br.com.rhconnect.modules.auth.entity.RefreshToken;
import br.com.rhconnect.modules.auth.entity.RoleUser;
import br.com.rhconnect.modules.auth.entity.Usuario;
import br.com.rhconnect.modules.auth.repository.UsuarioRepository;
import io.jsonwebtoken.Claims;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.server.ResponseStatusException;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class AuthServiceImplTest {

    @Mock
    private UsuarioRepository usuarioRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private AuthenticationManager authenticationManager;

    @Mock
    private TokenProvider tokenProvider;

    @InjectMocks
    private AuthServiceImpl authService;

    @Test
    void login_deveRetornarTokenQuandoCredenciaisValidas() {
        Usuario usuario = usuario("teste@rh.com", RoleUser.CANDIDATO);
        Authentication authentication = mock(Authentication.class);
        when(authentication.getPrincipal()).thenReturn(usuario);
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenReturn(authentication);
        when(tokenProvider.genereteAcessToken(usuario.getEmail())).thenReturn("token-jwt");
        Claims claims = claimsComExpiracaoFutura();
        when(tokenProvider.getClaims("token-jwt")).thenReturn(claims);

        AuthResponse response = authService.login(new LoginRequest("teste@rh.com", "senha123"));

        assertThat(response.accessToken()).isEqualTo("token-jwt");
        assertThat(response.tokenType()).isEqualTo("Bearer");
        assertThat(response.expiresIn()).isPositive();
        assertThat(response.user().email()).isEqualTo("teste@rh.com");
        assertThat(response.user().role()).isEqualTo(RoleUser.CANDIDATO);
        verify(authenticationManager).authenticate(any(UsernamePasswordAuthenticationToken.class));
    }

    @Test
    void login_deveLancarBadCredentialsQuandoSenhaInvalida() {
        when(authenticationManager.authenticate(any(UsernamePasswordAuthenticationToken.class)))
                .thenThrow(new BadCredentialsException("Usuário inexistente ou senha inválida"));

        LoginRequest request = new LoginRequest("teste@rh.com", "senha-errada");

        assertThatThrownBy(() -> authService.login(request))
                .isInstanceOf(BadCredentialsException.class);
    }

    @Test
    void register_deveCriarUsuarioComRolePadraoCandidato() {
        when(usuarioRepository.findByEmail("novo@rh.com")).thenReturn(Optional.empty());
        when(usuarioRepository.findByCpf("12345678901")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("senha123")).thenReturn("hash-encoded");
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(tokenProvider.genereteAcessToken("novo@rh.com")).thenReturn("token-jwt");
        Claims claims = claimsComExpiracaoFutura();
        when(tokenProvider.getClaims("token-jwt")).thenReturn(claims);

        RegisterRequest request = new RegisterRequest(
                "Novo Usuario", "novo@rh.com", "12345678901", "11999999999", "senha123", null);

        AuthResponse response = authService.register(request);

        assertThat(response.accessToken()).isEqualTo("token-jwt");
        assertThat(response.user().email()).isEqualTo("novo@rh.com");
        assertThat(response.user().role()).isEqualTo(RoleUser.CANDIDATO);
        verify(passwordEncoder).encode("senha123");
        verify(usuarioRepository).save(any(Usuario.class));
    }

    @Test
    void register_deveManterRoleInformada() {
        when(usuarioRepository.findByEmail("adm@rh.com")).thenReturn(Optional.empty());
        when(usuarioRepository.findByCpf("00000000000")).thenReturn(Optional.empty());
        when(passwordEncoder.encode("senha123")).thenReturn("hash-encoded");
        when(usuarioRepository.save(any(Usuario.class))).thenAnswer(invocation -> invocation.getArgument(0));
        when(tokenProvider.genereteAcessToken("adm@rh.com")).thenReturn("token-jwt");
        Claims claims = claimsComExpiracaoFutura();
        when(tokenProvider.getClaims("token-jwt")).thenReturn(claims);

        RegisterRequest request = new RegisterRequest(
                "Admin", "adm@rh.com", "00000000000", null, "senha123", RoleUser.ADMIN);

        AuthResponse response = authService.register(request);

        assertThat(response.user().role()).isEqualTo(RoleUser.ADMIN);
    }

    @Test
    void register_deveLancarConflictQuandoEmailJaExiste() {
        when(usuarioRepository.findByEmail("existente@rh.com")).thenReturn(Optional.of(new Usuario()));

        RegisterRequest request = new RegisterRequest(
                "Dup", "existente@rh.com", "00000000000", null, "senha123", null);

        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("E-mail já cadastrado");
    }

    @Test
    void register_deveLancarConflictQuandoCpfJaExiste() {
        when(usuarioRepository.findByEmail("novo@rh.com")).thenReturn(Optional.empty());
        when(usuarioRepository.findByCpf("99999999999")).thenReturn(Optional.of(new Usuario()));

        RegisterRequest request = new RegisterRequest(
                "Novo", "novo@rh.com", "99999999999", null, "senha123", null);

        assertThatThrownBy(() -> authService.register(request))
                .isInstanceOf(ResponseStatusException.class)
                .hasMessageContaining("CPF já cadastrado");
    }

    @Test
    void gerarRefreshToken_deveDelegarParaTokenProvider() {
        RefreshToken refreshToken = new RefreshToken(usuario("teste@rh.com", RoleUser.CANDIDATO), "token", 900_000L);
        when(tokenProvider.genereteRefreshToken("teste@rh.com")).thenReturn(refreshToken);

        RefreshToken resultado = authService.gerarRefreshToken("teste@rh.com");

        assertThat(resultado).isEqualTo(refreshToken);
        verify(tokenProvider).genereteRefreshToken("teste@rh.com");
    }

    @Test
    void validaRefreshToken_deveDelegarParaTokenProvider() {
        when(tokenProvider.validaRefreshToken("token-valido")).thenReturn(true);

        Boolean resultado = authService.validaRefreshToken("token-valido");

        assertThat(resultado).isTrue();
        verify(tokenProvider).validaRefreshToken("token-valido");
    }

    @Test
    void validaRefreshToken_deveRetornarFalsoQuandoTokenInvalido() {
        when(tokenProvider.validaRefreshToken("token-invalido")).thenReturn(false);

        Boolean resultado = authService.validaRefreshToken("token-invalido");

        assertThat(resultado).isFalse();
    }

    @Test
    void revogaRefreshToken_deveDelegarParaTokenProvider() {
        authService.revogaRefreshToken("token-a-revogar");

        verify(tokenProvider).revogaRefreshToken("token-a-revogar");
    }

    @Test
    void verificaRefreshTokenUsado_deveDelegarParaTokenProvider() {
        when(tokenProvider.verificaRefreshTokenUsado("token-usado")).thenReturn(true);

        Boolean resultado = authService.verificaRefreshTokenUsado("token-usado");

        assertThat(resultado).isTrue();
        verify(tokenProvider).verificaRefreshTokenUsado("token-usado");
    }

    @Test
    void rotacionarRefreshToken_deveDelegarParaTokenProvider() {
        RefreshToken novo = new RefreshToken(usuario("teste@rh.com", RoleUser.CANDIDATO), "novo-token", 900_000L);
        when(tokenProvider.rotacionarRefreshToken("token-atual")).thenReturn(novo);

        RefreshToken resultado = authService.rotacionarRefreshToken("token-atual");

        assertThat(resultado).isEqualTo(novo);
        verify(tokenProvider).rotacionarRefreshToken("token-atual");
    }

    private Usuario usuario(String email, RoleUser role) {
        Usuario usuario = new Usuario();
        usuario.setId(UUID.randomUUID());
        usuario.setNomeCompleto("Usuario Teste");
        usuario.setEmail(email);
        usuario.setSenhaHash("hash");
        usuario.setRole(role);
        usuario.setAtivo(true);
        return usuario;
    }

    private Claims claimsComExpiracaoFutura() {
        Claims claims = mock(Claims.class);
        when(claims.getExpiration()).thenReturn(new Date(System.currentTimeMillis() + 900_000));
        return claims;
    }
}