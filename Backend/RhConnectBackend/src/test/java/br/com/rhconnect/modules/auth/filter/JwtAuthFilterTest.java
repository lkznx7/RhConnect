package br.com.rhconnect.modules.auth.filter;

import br.com.rhconnect.modules.auth.entity.RoleUser;
import br.com.rhconnect.modules.auth.entity.Usuario;
import br.com.rhconnect.modules.auth.service.TokenProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class JwtAuthFilterTest {

    @Mock
    private TokenProvider tokenProvider;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    private JwtAuthFilter jwtAuthFilter;

    @BeforeEach
    void setUp() {
        jwtAuthFilter = new JwtAuthFilter(tokenProvider);
    }

    @AfterEach
    void limparContexto() {
        SecurityContextHolder.clearContext();
    }

    @Test
    void deveAutenticarQuandoAuthorizationHeaderValido() throws Exception {
        Usuario usuario = usuarioAutenticado("teste@rh.com");
        when(request.getHeader("Authorization")).thenReturn("Bearer token-jwt");
        when(tokenProvider.validateToken("token-jwt")).thenReturn(true);
        when(tokenProvider.getUsername("token-jwt")).thenReturn("teste@rh.com");
        when(tokenProvider.findUserByUsername("teste@rh.com")).thenReturn(Optional.of(usuario));

        jwtAuthFilter.doFilterInternal(request, response, filterChain);

        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNotNull();
        assertThat(SecurityContextHolder.getContext().getAuthentication().getPrincipal()).isEqualTo(usuario);
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void deveAutenticarViaCookieHttpOnly() throws Exception {
        Usuario usuario = usuarioAutenticado("cookie@rh.com");
        when(request.getHeader("Authorization")).thenReturn(null);
        when(request.getCookies()).thenReturn(new Cookie[]{new Cookie("accessToken", "token-do-cookie")});
        when(tokenProvider.validateToken("token-do-cookie")).thenReturn(true);
        when(tokenProvider.getUsername("token-do-cookie")).thenReturn("cookie@rh.com");
        when(tokenProvider.findUserByUsername("cookie@rh.com")).thenReturn(Optional.of(usuario));

        jwtAuthFilter.doFilterInternal(request, response, filterChain);

        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNotNull();
        assertThat(SecurityContextHolder.getContext().getAuthentication().getPrincipal()).isEqualTo(usuario);
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void naoDeveAutenticarQuandoTokenInvalido() throws Exception {
        when(request.getHeader("Authorization")).thenReturn("Bearer token-invalido");
        when(tokenProvider.validateToken("token-invalido")).thenReturn(false);

        jwtAuthFilter.doFilterInternal(request, response, filterChain);

        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void naoDeveAutenticarQuandoNaoHaTokenNemCookie() throws Exception {
        when(request.getHeader("Authorization")).thenReturn(null);
        when(request.getCookies()).thenReturn(null);

        jwtAuthFilter.doFilterInternal(request, response, filterChain);

        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void naoDeveAutenticarQuandoHeaderNaoEhBearer() throws Exception {
        when(request.getHeader("Authorization")).thenReturn("Basic dXNlcm86c2VuaGE=");
        when(request.getCookies()).thenReturn(null);

        jwtAuthFilter.doFilterInternal(request, response, filterChain);

        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
        verify(filterChain).doFilter(request, response);
    }

    @Test
    void naoDeveAutenticarQuandoUsuarioDoTokenNaoExiste() throws Exception {
        when(request.getHeader("Authorization")).thenReturn("Bearer token-valido");
        when(tokenProvider.validateToken("token-valido")).thenReturn(true);
        when(tokenProvider.getUsername("token-valido")).thenReturn("sumido@rh.com");
        when(tokenProvider.findUserByUsername("sumido@rh.com")).thenReturn(Optional.empty());

        jwtAuthFilter.doFilterInternal(request, response, filterChain);

        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();
        verify(filterChain).doFilter(request, response);
    }

    private Usuario usuarioAutenticado(String email) {
        Usuario usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setRole(RoleUser.CANDIDATO);
        return usuario;
    }
}