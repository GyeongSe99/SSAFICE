package com.jetty.ssafficebe.sso.factory;

import com.jetty.ssafficebe.sso.enums.SsoProvider;
import com.jetty.ssafficebe.sso.service.SsafySsoServiceImpl;
import com.jetty.ssafficebe.sso.service.SsoService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Component
@RequiredArgsConstructor
public class SsoServiceFactory {

    private final SsafySsoServiceImpl ssafySsoService;

    /**
     * 주어진 providerType에 맞는 SsoService 구현체를 반환합니다.
     * 현재는 SSAFY만 지원.
     */
    public SsoService getSsoService(String providerType) {
        if (StringUtils.isEmpty(providerType)) {
            throw new IllegalArgumentException("Provider cannot be null");
        }

        SsoProvider provider = SsoProvider.fromType(providerType);
        return switch (provider) {
            case SSAFY -> ssafySsoService;
            default -> throw new IllegalArgumentException("Unsupported provider: " + provider);
        };
    }
}
