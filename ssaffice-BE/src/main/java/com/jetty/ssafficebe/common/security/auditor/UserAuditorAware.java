package com.jetty.ssafficebe.common.security.auditor;

import com.jetty.ssafficebe.common.security.userdetails.CustomUserDetails;
import java.util.Optional;
import org.springframework.data.domain.AuditorAware;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class UserAuditorAware implements AuditorAware<Long> {

    @Override
    public Optional<Long> getCurrentAuditor() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()
                || authentication instanceof AnonymousAuthenticationToken
                || authentication.getPrincipal() == null
                || !(authentication.getPrincipal() instanceof CustomUserDetails)) {
            return Optional.empty();
        }

        return Optional.ofNullable(((CustomUserDetails) authentication.getPrincipal()).getUserId());
    }
}
