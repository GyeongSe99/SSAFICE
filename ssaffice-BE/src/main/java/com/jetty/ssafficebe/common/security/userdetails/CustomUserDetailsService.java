package com.jetty.ssafficebe.common.security.userdetails;

import com.jetty.ssafficebe.common.exception.ErrorCode;
import com.jetty.ssafficebe.common.exception.exceptiontype.ResourceNotFoundException;
import com.jetty.ssafficebe.role.entity.UserRole;
import com.jetty.ssafficebe.user.entity.User;
import com.jetty.ssafficebe.user.repository.UserRepository;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Transactional
@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = this.userRepository.findByEmail(email).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "email", email));

        return CustomUserDetails.builder()
                                .userId(user.getUserId())
                                .email(user.getEmail())
                                .password(user.getPassword())
                                .authorities(AuthorityUtils.createAuthorityList(this.getRoleIds(user)))
                                .disabled(!user.isDisabled())
                                .build();
    }

    private List<String> getRoleIds(User user) {
        return user.getUserRoles().stream()
                   .map(UserRole::getRoleId)
                   .toList();
    }
}
