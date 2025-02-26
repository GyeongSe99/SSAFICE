package com.jetty.ssafficebe.mattermost.util;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import jakarta.annotation.PostConstruct;
import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Component
@RequiredArgsConstructor
public class MattermostUtil {

    private static final String VERSION = "v4";
    @Value("${ssafyproject.openapi.key}")
    private String openApiKey;
    @Value("${ssafyproject.openapi.url}")
    private String openApiUrl;
    @Value("${mattermost.url}")
    private String mattermostUrl;
    private RestTemplate restTemplate;
    private String authToken;

    @PostConstruct
    private void initializeRestTemplate() {
        ObjectMapper objectMapper = new ObjectMapper().setPropertyNamingStrategy(
                                                              new PropertyNamingStrategies.SnakeCaseStrategy())
                                                      .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES,
                                                                 false);

        List<HttpMessageConverter<?>> messageConverters = new ArrayList<>();
//      Response가 String형태로 넘어올 때 확인할 수 있도록 converter에 추가
        StringHttpMessageConverter stringConverter = new StringHttpMessageConverter(StandardCharsets.UTF_8);
        messageConverters.add(stringConverter);
        MappingJackson2HttpMessageConverter converter = new MappingJackson2HttpMessageConverter(objectMapper);
        messageConverters.add(converter);

        RestTemplate template = new RestTemplate();
        template.setMessageConverters(messageConverters);
        this.restTemplate = template;
    }

    public <T, U> ResponseEntity<T> callApi(String path, MultiValueMap<String, String> queryParameters,
                                            HttpMethod method, U body, Class<T> responseType) {
        ResponseEntity<T> response;
        try {
            RequestEntity<U> requestEntity = RequestEntity.method(method, this.generateMMUri(path, queryParameters))
                                                          .contentType(MediaType.APPLICATION_JSON).body(body);
            response = this.restTemplate.exchange(requestEntity, responseType);
        } catch (HttpStatusCodeException exception) {
            response = new ResponseEntity<>(exception.getStatusCode());
        }
        return response;
    }

    private URI generateMMUri(String path, MultiValueMap<String, String> queryParameters) {
        UriComponentsBuilder mmUriCompBuilder = UriComponentsBuilder.fromUriString(openApiUrl).pathSegment(VERSION)
                                                                    .pathSegment("mm").pathSegment(path)
                                                                    .queryParam("apiKey", openApiKey);

        if (queryParameters != null) {
            mmUriCompBuilder.queryParams(queryParameters);
        }

        return mmUriCompBuilder.build().toUri();
    }

    // mattermostApi 의 Token을 발급하는 메서드(이 위 까지는 SSAFY API와 관한 메서드임)
    public String makeMMAccessToken(String username, String password) {
        String loginUrl = mattermostUrl + "/users/login";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String loginRequestBody = String.format("{\"login_id\": \"%s\", \"password\": \"%s\"}", username, password);
        HttpEntity<String> requestEntity = new HttpEntity<>(loginRequestBody, headers);

        try {
            ResponseEntity<String> response = this.restTemplate.exchange(loginUrl, HttpMethod.POST, requestEntity,
                                                                         String.class);
            if (response.getStatusCode() == HttpStatus.OK) {
                authToken = response.getHeaders().getFirst("Token");
                return this.authToken;
            }
        } catch (HttpStatusCodeException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    // Token을 통해 MM Api를 불러옴
    public <T, U> ResponseEntity<T> callMattermostApi(String endpoint, HttpMethod method, U body, Class<T> responseType,
                                                      String authToken) {
        String apiUrl = mattermostUrl + endpoint;

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(authToken);  // 토큰을 Bearer 형식으로 헤더에 설정
        headers.setContentType(MediaType.APPLICATION_JSON);

        ResponseEntity<T> response;
        try {
            RequestEntity<U> requestEntity = RequestEntity.method(method, apiUrl).headers(headers).body(body);
            response = this.restTemplate.exchange(requestEntity, responseType);
        } catch (HttpStatusCodeException exception) {
            response = new ResponseEntity<>(exception.getStatusCode());
        }
        return response;
    }

}
