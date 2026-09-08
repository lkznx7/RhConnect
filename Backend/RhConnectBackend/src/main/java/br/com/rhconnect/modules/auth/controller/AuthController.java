package br.com.rhconnect.modules.auth.controller;

import br.com.rhconnect.modules.auth.dto.AuthResponse;
import br.com.rhconnect.modules.auth.dto.LoginRequest;
import br.com.rhconnect.modules.auth.dto.RefreshTokenRequest;
import br.com.rhconnect.modules.auth.dto.RefreshTokenResponse;
import br.com.rhconnect.modules.auth.dto.RegisterRequest;
import br.com.rhconnect.modules.auth.entity.RefreshToken;
import br.com.rhconnect.modules.auth.service.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private static final String TOKEN_COOKIE = "accessToken";

    private final AuthService authService;


    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request,
                                              HttpServletResponse response) {
        AuthResponse body = authService.login(request);
        adicionarCookie(response, body);
        return ResponseEntity.ok(body);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request,
                                                 HttpServletResponse response) {
        AuthResponse body = authService.register(request);
        adicionarCookie(response, body);
        return ResponseEntity.status(HttpStatus.CREATED).body(body);
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshTokenResponse> gerarRefreshToken(@RequestBody String username) {
        RefreshToken refreshToken = authService.gerarRefreshToken(username);
        return ResponseEntity.ok(new RefreshTokenResponse(refreshToken.getToken(), refreshToken.getExpiryDate()));
    }

    @PostMapping("/refresh/rotacionar")
    public ResponseEntity<RefreshTokenResponse> rotacionarRefreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        RefreshToken refreshToken = authService.rotacionarRefreshToken(request.refreshToken());
        return ResponseEntity.ok(new RefreshTokenResponse(refreshToken.getToken(), refreshToken.getExpiryDate()));
    }

    @PostMapping("/refresh/validar")
    public ResponseEntity<Boolean> validarRefreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        Boolean valido = authService.validaRefreshToken(request.refreshToken());
        return ResponseEntity.ok(valido);
    }

    @PostMapping("/refresh/revogar")
    public ResponseEntity<Void> revogarRefreshToken(@Valid @RequestBody RefreshTokenRequest request) {
        authService.revogaRefreshToken(request.refreshToken());
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/refresh/usado")
    public ResponseEntity<Boolean> verificarRefreshTokenUsado(@Valid @RequestBody RefreshTokenRequest request) {
        Boolean usado = authService.verificaRefreshTokenUsado(request.refreshToken());
        return ResponseEntity.ok(usado);
    }


    private void adicionarCookie(HttpServletResponse response, AuthResponse auth) {
        ResponseCookie cookie = ResponseCookie.from(TOKEN_COOKIE, auth.accessToken())
                .httpOnly(true)
                .secure(true)
                .sameSite("Strict")
                .path("/")
                .maxAge(Duration.ofMillis(auth.expiresIn()))
                .build();
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
    }


}