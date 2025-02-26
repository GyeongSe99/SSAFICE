package com.jetty.ssafficebe.common.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import java.util.List;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(apiInfo())
                .servers(List.of(new Server().url("http://localhost:9090").description("Local server"),
                                 new Server().url("https://k11a605.p.ssafy.io").description("Production server")))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components().addSecuritySchemes("bearerAuth",
                                                                new SecurityScheme()
                                                                        .type(SecurityScheme.Type.HTTP)
                                                                        .scheme("bearer")
                                                                        .bearerFormat("JWT")
                                                                        .name("Authorization")  // 헤더 이름 설정
                                                                        .in(SecurityScheme.In.HEADER)));
    }

    private Info apiInfo() {
        return new Info()
                .title("SSAFICE API")
                .description("SSAFICE API Documentation")
                .version("1.0.0")
                .contact(new Contact()
                                 .name("천세경")
                                 .email("jay45652@gmail.com"));
    }

    @Bean
    public GroupedOpenApi allApi() {
        return GroupedOpenApi.builder()
                             .group("All")
                             .pathsToMatch("/api/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi authApi() {
        return GroupedOpenApi.builder()
                .group("auth")
                .pathsToMatch("/api/auth/**")
                .build();
    }

    @Bean
    public GroupedOpenApi channelApi() {
        return GroupedOpenApi.builder()
                             .group("channel")
                             .pathsToMatch("/api/channels/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi fileApi() {
        return GroupedOpenApi.builder()
                             .group("file")
                             .pathsToMatch("/api/attachment-files/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi mattermostApi() {
        return GroupedOpenApi.builder()
                             .group("mattermost")
                             .pathsToMatch("/api/mm/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi noticeApi() {
        return GroupedOpenApi.builder()
                             .group("notice - 공지")
                             .pathsToMatch("/api/notice/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi roleApi() {
        return GroupedOpenApi.builder()
                             .group("role")
                             .pathsToMatch("/api/roles/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi scheduleApi() {
        return GroupedOpenApi.builder()
                             .group("schedule - 일정")
                             .pathsToMatch("/api/schedules/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi searchApi() {
        return GroupedOpenApi.builder()
                             .group("elasticsearch")
                             .pathsToMatch("/api/es/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi SSOApi() {
        return GroupedOpenApi.builder()
                             .group("SSAFY SSO")
                             .pathsToMatch("/api/sso/**")
                             .build();
    }

    @Bean
    public GroupedOpenApi userApi() {
        return GroupedOpenApi.builder()
                             .group("user")
                             .pathsToMatch("/api/users/**")
                             .build();
    }

}
