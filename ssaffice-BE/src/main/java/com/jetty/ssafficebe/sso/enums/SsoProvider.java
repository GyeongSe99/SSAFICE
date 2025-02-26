package com.jetty.ssafficebe.sso.enums;

import java.util.Arrays;

public enum SsoProvider {
    SSAFY;

    /**
     * Provider가 SsoProvider에 있는지 확인하고 반환
     *  잘못된 provider가 들어오면 IllegalArgumentException을 던짐
     */
    public static SsoProvider fromType(String type) {
        return Arrays.stream(SsoProvider.values())
                .filter(provider -> provider.name().equalsIgnoreCase(type))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException(type + " is not a valid provider"));
    }
}
