package com.jetty.ssafficebe.sso.service;


import com.jetty.ssafficebe.common.exception.exceptiontype.AppException;
import com.jetty.ssafficebe.sso.config.SsafyConfig;
import com.jetty.ssafficebe.sso.payload.SsoAuthToken;
import com.jetty.ssafficebe.user.payload.UserRequestForSso;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
public class SsafySsoServiceImpl implements SsoService {

    private final SsafyConfig ssafyConfig;

    @Override
    public String getAuthCodeRequestUrl() {
        return UriComponentsBuilder
                .fromUriString(ssafyConfig.authorizationUri())
                .queryParam("client_id", ssafyConfig.clientId())
                .queryParam("redirect_uri", ssafyConfig.redirectUri())
                .queryParam("response_type", "code")
                .build()
                .toUriString();
    }

    /**
     * 프론트에서 넘어온 인증 코드로 인증 토큰 요청
     */
    @Override
    public SsoAuthToken getSsoAuthToken(String code) {

        final HttpEntity<MultiValueMap<String, String>> httpEntity = createTokenRequestEntity(code);

        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<SsoAuthToken> response = restTemplate.exchange(ssafyConfig.tokenUri(), HttpMethod.POST, httpEntity,
                                                                          SsoAuthToken.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            } else {
                throw new RuntimeException("인증 서버로부터 AuthToken 정보를 가져오는데 실패하였습니다.",
                        new AuthenticationServiceException("Authentication Failed with code " + response.getStatusCode()));
            }
        } catch (HttpClientErrorException ex) {
            throw new RuntimeException("인증 서버로부터 AuthToken 정보를 가져오는데 실패하였습니다.\n관리자에게 문의하세요.", ex);
        }
    }

    /**
     * 토큰으로 SSO 서버에 사용자 정보 요청
     */
    @Override
    public UserRequestForSso getLoginUserInfo(SsoAuthToken token) {
        final HttpEntity<MultiValueMap<String, String>> httpEntity = createUserInfoRequestEntity(token.getAccess_token());
        RestTemplate restTemplate = new RestTemplate();
        try {
            ResponseEntity<UserRequestForSso> response = restTemplate.exchange(ssafyConfig.userInfoUri(), HttpMethod.GET, httpEntity, UserRequestForSso.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            } else {
                throw new AppException("인증 서버로부터 사용자 정보를 가져오는데 실패하였습니다.",
                        new AuthenticationServiceException("Authentication Failed with code " + response.getStatusCode()));
            }
        } catch (HttpClientErrorException ex) {
            throw new AppException("인증 서버로부터 사용자 정보를 가져오는데 실패하였습니다.", ex);
        }
    }

    private HttpEntity<MultiValueMap<String, String>> createTokenRequestEntity(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", ssafyConfig.clientId());
        params.add("client_secret", ssafyConfig.clientSecret());
        params.add("redirect_uri", ssafyConfig.redirectUri());
        params.add("code", code);

        return new HttpEntity<>(params, headers);
    }

    private HttpEntity<MultiValueMap<String, String>> createUserInfoRequestEntity(String token) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + token);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        return new HttpEntity<>(headers);
    }
}
