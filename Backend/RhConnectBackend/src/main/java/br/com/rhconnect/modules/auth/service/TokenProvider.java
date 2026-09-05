package br.com.rhconnect.modules.auth.service;

import br.com.rhconnect.modules.auth.entity.RefreshToken;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Optional;

public interface TokenProvider extends UserDetailsService {

    String genereteAcessToken(String username);
    RefreshToken genereteRefreshToken(String username);

    String sign(String payload);
    Claims getClaims(String token);
    String getUsername(String token);
    String getRole(String token);
    Boolean validateToken(String token);
    SecretKey singInKey();

    Boolean validaRefreshToken(String token);
    void revogaRefreshToken(String token);
    Boolean verificaRefreshTokenUsado(String token);
    RefreshToken getRefreshToken(String token);
    RefreshToken rotacionarRefreshToken(String token);
    Optional<UserDetails> findUserByUsername(String username);
}
