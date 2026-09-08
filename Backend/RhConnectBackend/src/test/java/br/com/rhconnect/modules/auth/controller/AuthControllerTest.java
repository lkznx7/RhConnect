package br.com.rhconnect.modules.auth.controller;

import br.com.rhconnect.modules.auth.dto.AuthResponse;
import br.com.rhconnect.modules.auth.dto.LoginRequest;
import br.com.rhconnect.modules.auth.dto.RegisterRequest;
import br.com.rhconnect.modules.auth.entity.RefreshToken;
import br.com.rhconnect.modules.auth.entity.RoleUser;
import br.com.rhconnect.modules.auth.entity.Usuario;
import br.com.rhconnect.modules.auth.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.util.UUID;

import static org.hamcrest.Matchers.containsString;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class AuthControllerTest {

    @Mock
    private AuthService authService;

    private MockMvc mockMvc;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @BeforeEach
    void setUp() {
        LocalValidatorFactoryBean validator = new LocalValidatorFactoryBean();
        validator.afterPropertiesSet();
        mockMvc = MockMvcBuilders.standaloneSetup(new AuthController(authService))
                .setValidator(validator)
                .build();
    }

    @Test
    void loginDeveRetornar200ComToken() throws Exception {
        when(authService.login(any(LoginRequest.class))).thenReturn(respostaAuth());

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest("teste@rh.com", "senha123"))))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("token-jwt"))
                .andExpect(jsonPath("$.tokenType").value("Bearer"))
                .andExpect(jsonPath("$.user.email").value("teste@rh.com"))
                .andExpect(header().string("Set-Cookie", containsString("accessToken=token-jwt")))
                .andExpect(header().string("Set-Cookie", containsString("HttpOnly")))
                .andExpect(header().string("Set-Cookie", containsString("SameSite=Strict")));
    }

    @Test
    void loginComEmailInvalidoDeveRetornar400() throws Exception {
        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new LoginRequest("", "senha123"))))
                .andExpect(status().isBadRequest());
    }

    @Test
    void registerDeveRetornar201() throws Exception {
        when(authService.register(any(RegisterRequest.class))).thenReturn(respostaAuth());

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new RegisterRequest(
                                "Teste", "teste@rh.com", "12345678901", null, "senha123", RoleUser.CANDIDATO))))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.accessToken").value("token-jwt"))
                .andExpect(jsonPath("$.user.role").value("CANDIDATO"))
                .andExpect(header().string("Set-Cookie", containsString("accessToken=token-jwt")));
    }

    @Test
    void registerSemSenhaDeveRetornar400() throws Exception {
        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(new RegisterRequest(
                                "Teste", "teste@rh.com", "12345678901", null, "", RoleUser.CANDIDATO))))
                .andExpect(status().isBadRequest());
    }

    @Test
    void refreshDeveRetornar200ComRefreshToken() throws Exception {
        RefreshToken refreshToken = new RefreshToken(usuario(), "refresh-token-jwt", 900_000L);
        when(authService.gerarRefreshToken("teste@rh.com")).thenReturn(refreshToken);

        mockMvc.perform(post("/api/auth/refresh")
                        .contentType(MediaType.TEXT_PLAIN)
                        .content("teste@rh.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.refreshToken").value("refresh-token-jwt"))
                .andExpect(jsonPath("$.expiresIn").value(900_000L));
    }

    @Test
    void validarRefreshTokenDeveRetornar200ComTrue() throws Exception {
        when(authService.validaRefreshToken("refresh-token-jwt")).thenReturn(true);

        mockMvc.perform(post("/api/auth/refresh/validar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"refreshToken\":\"refresh-token-jwt\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));
    }

    @Test
    void validarRefreshTokenSemTokenDeveRetornar400() throws Exception {
        mockMvc.perform(post("/api/auth/refresh/validar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"refreshToken\":\"\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void revogarRefreshTokenDeveRetornar204() throws Exception {
        mockMvc.perform(post("/api/auth/refresh/revogar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"refreshToken\":\"refresh-token-jwt\"}"))
                .andExpect(status().isNoContent());

        verify(authService).revogaRefreshToken(eq("refresh-token-jwt"));
    }

    @Test
    void revogarRefreshTokenSemTokenDeveRetornar400() throws Exception {
        mockMvc.perform(post("/api/auth/refresh/revogar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"refreshToken\":\"\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void verificarRefreshTokenUsadoDeveRetornar200ComTrue() throws Exception {
        when(authService.verificaRefreshTokenUsado("refresh-token-jwt")).thenReturn(true);

        mockMvc.perform(post("/api/auth/refresh/usado")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"refreshToken\":\"refresh-token-jwt\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").value(true));
    }

    @Test
    void verificarRefreshTokenUsadoSemTokenDeveRetornar400() throws Exception {
        mockMvc.perform(post("/api/auth/refresh/usado")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"refreshToken\":\"\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void rotacionarRefreshTokenDeveRetornar200ComNovoToken() throws Exception {
        RefreshToken novo = new RefreshToken(usuario(), "novo-refresh-token-jwt", 900_000L);
        when(authService.rotacionarRefreshToken("refresh-token-jwt")).thenReturn(novo);

        mockMvc.perform(post("/api/auth/refresh/rotacionar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"refreshToken\":\"refresh-token-jwt\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.refreshToken").value("novo-refresh-token-jwt"))
                .andExpect(jsonPath("$.expiresIn").value(900_000L));
    }

    @Test
    void rotacionarRefreshTokenSemTokenDeveRetornar400() throws Exception {
        mockMvc.perform(post("/api/auth/refresh/rotacionar")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"refreshToken\":\"\"}"))
                .andExpect(status().isBadRequest());
    }

    private Usuario usuario() {
        Usuario usuario = new Usuario();
        usuario.setId(UUID.randomUUID());
        usuario.setEmail("teste@rh.com");
        usuario.setRole(RoleUser.CANDIDATO);
        return usuario;
    }

    private AuthResponse respostaAuth() {
        return new AuthResponse(
                "token-jwt",
                "Bearer",
                900_000,
                new AuthResponse.UserResponse(
                        UUID.randomUUID(), "Teste", "teste@rh.com", RoleUser.CANDIDATO));
    }
}