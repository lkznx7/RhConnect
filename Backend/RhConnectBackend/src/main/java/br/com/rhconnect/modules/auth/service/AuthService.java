package br.com.rhconnect.modules.auth.service;

import br.com.rhconnect.modules.auth.dto.AuthResponse;
import br.com.rhconnect.modules.auth.dto.LoginRequest;
import br.com.rhconnect.modules.auth.dto.RegisterRequest;
import br.com.rhconnect.modules.auth.entity.RefreshToken;

public interface AuthService {

    AuthResponse login(LoginRequest request);

    AuthResponse register(RegisterRequest request);

    RefreshToken gerarRefreshToken(String username);

    Boolean validaRefreshToken(String token);

    void revogaRefreshToken(String token);

    Boolean verificaRefreshTokenUsado(String token);

    RefreshToken rotacionarRefreshToken(String token);
}