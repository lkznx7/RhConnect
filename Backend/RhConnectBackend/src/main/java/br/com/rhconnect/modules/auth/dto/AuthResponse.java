package br.com.rhconnect.modules.auth.dto;

import br.com.rhconnect.modules.auth.entity.RoleUser;

import java.util.UUID;

public record AuthResponse(
        String accessToken,
        String tokenType,
        long expiresIn,
        UserResponse user
) {
    public record UserResponse(
            UUID id,
            String nomeCompleto,
            String email,
            RoleUser role
    ) {
    }
}