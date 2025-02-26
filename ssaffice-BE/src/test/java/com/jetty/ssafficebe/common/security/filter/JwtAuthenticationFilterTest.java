package com.jetty.ssafficebe.common.security.filter;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.*;

import com.jetty.ssafficebe.common.security.jwt.JwtProvider;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import java.io.IOException;

@ExtendWith(MockitoExtension.class)
class JwtAuthenticationFilterTest {

    @Mock
    private JwtProvider jwtProvider;

    @Mock
    private UserDetailsService userDetailsService;

    @Mock
    private HttpServletRequest request;

    @Mock
    private HttpServletResponse response;

    @Mock
    private FilterChain filterChain;

    @Mock
    private UserDetails userDetails;

    @InjectMocks
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @BeforeEach
    void setUp() {
        SecurityContextHolder.clearContext();
    }

    @DisplayName("토큰이 유효한 경우")
    @Test
    void testValidJwtToken() throws ServletException, IOException {
        // Given
        String token = "valid.jwt.token";
        String email = "test@example.com";

        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        when(jwtProvider.validateToken(token)).thenReturn(true);
        when(jwtProvider.getUserEmailFromToken(token)).thenReturn(email);
        when(userDetailsService.loadUserByUsername(email)).thenReturn(userDetails);

        // When
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Then
        UsernamePasswordAuthenticationToken authentication = (UsernamePasswordAuthenticationToken)
                SecurityContextHolder.getContext().getAuthentication();

        assertThat(authentication).isNotNull();
        assertThat(authentication.getPrincipal()).isEqualTo(userDetails);

        verify(jwtProvider, times(1)).validateToken(token);
        verify(jwtProvider, times(1)).getUserEmailFromToken(token);
        verify(userDetailsService, times(1)).loadUserByUsername(email);
        verify(filterChain, times(1)).doFilter(request, response);
    }

    @DisplayName("토큰이 유효하지 않은 경우")
    @Test
    void testInvalidJwtToken() throws ServletException, IOException {
        // Given
        String token = "invalid.jwt.token";
        String email = "test@example.com";

        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        when(jwtProvider.validateToken(token)).thenReturn(false);

        // When
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Then
        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();

        verify(jwtProvider, times(1)).validateToken(token);
        verify(jwtProvider, times(0)).getUserEmailFromToken(token);
        verify(userDetailsService, times(0)).loadUserByUsername(email);
        verify(filterChain, times(1)).doFilter(request, response);
    }

    @DisplayName("헤더에 JWT 토큰이 없는 경우")
    @Test
    void testNoJwtTokenInHeader() throws ServletException, IOException {
        // Given
        when(request.getHeader("Authorization")).thenReturn(null);

        // When
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Then
        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();

        verify(jwtProvider, times(1)).validateToken(any());
        verify(jwtProvider, times(0)).getUserEmailFromToken(any());
        verify(userDetailsService, times(0)).loadUserByUsername(any());
        verify(filterChain, times(1)).doFilter(request, response);
    }

    @DisplayName("만료된 JWT 토큰인 경우")
    @Test
    void testExpiredJwtToken() throws ServletException, IOException {
        // Given
        String token = "expired.jwt.token";

        when(request.getHeader("Authorization")).thenReturn("Bearer " + token);
        when(jwtProvider.validateToken(token)).thenReturn(false);

        // When
        jwtAuthenticationFilter.doFilterInternal(request, response, filterChain);

        // Then
        assertThat(SecurityContextHolder.getContext().getAuthentication()).isNull();

        verify(jwtProvider, times(1)).validateToken(token);
        verify(jwtProvider, times(0)).getUserEmailFromToken(any());
        verify(userDetailsService, times(0)).loadUserByUsername(any());
        verify(filterChain, times(1)).doFilter(request, response);
    }
}
