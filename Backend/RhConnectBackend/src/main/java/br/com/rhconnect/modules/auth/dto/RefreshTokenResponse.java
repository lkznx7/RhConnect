package br.com.rhconnect.modules.auth.dto;

public record RefreshTokenResponse(
        String refreshToken,
        long expiresIn
) {
}