package com.jetty.ssafficebe.common.security.jwt;

import com.jetty.ssafficebe.common.security.util.KeyExpander;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import java.util.Date;
import javax.crypto.SecretKey;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {

    @Value("${jwt.springsecurity.secret}")
    private String secretKeyString;
    private SecretKey secretKey;
    @Value("${jwt.springsecurity.expiration}")
    private long expiration;

    @PostConstruct
    protected void init() {
        secretKey = Keys.hmacShaKeyFor(KeyExpander.expandKey(this.secretKeyString.getBytes(), 64));
    }

    public String generateToken(String email) {
        return Jwts.builder()
                   .subject(email)
                   .expiration(new Date(System.currentTimeMillis() + expiration))
                   .signWith(this.secretKey)
                   .compact();
    }

    public boolean validateToken(String token) {
        try {
            if (StringUtils.hasText(token)) {
                Jwts.parser().verifyWith(this.secretKey).build().parseSignedClaims(token);
                return true;
            }
        } catch (MalformedJwtException ex) {
            log.error("Invalid JWT token : {}", token, ex);
        } catch (ExpiredJwtException ex) {
            log.error("Expired JWT token : {}", token, ex);
        } catch (UnsupportedJwtException ex) {
            log.error("Unsupported JWT token : {}", token, ex);
        } catch (IllegalArgumentException ex) {
            log.error("JWT claims string is empty. : {}", token, ex);
        } catch (Exception ex) {
            log.error("Invalid JWT token : {}", token, ex);
        }
        return false;
    }

    public Claims getClaims(String token) {
        return Jwts.parser().verifyWith(this.secretKey).build().parseSignedClaims(token).getPayload();
    }

    public String getUserEmailFromToken(String token) {
        return this.getClaims(token).getSubject();
    }

}
