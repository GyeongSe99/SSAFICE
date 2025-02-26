package com.jetty.ssafficebe.common.security.userdetails;

import java.io.Serializable;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.Set;
import java.util.SortedSet;
import java.util.TreeSet;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.SpringSecurityCoreVersion;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.Assert;

@Getter
@Setter
@RequiredArgsConstructor
public class CustomUserDetails implements UserDetails {

    private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;
    private Long userId;
    private String email;
    private String password;
    private Set<GrantedAuthority> authorities;
    private boolean disabled;

    @Builder
    public CustomUserDetails(Long userId, String email, String password, boolean disabled,
                             Collection<? extends GrantedAuthority> authorities) {
        Assert.isTrue(email != null && !email.isEmpty(), "Cannot pass null or empty values to constructor");
        this.userId = userId;
        this.email = email;
        this.password = password;
        this.disabled = !disabled;
        this.authorities = Collections.unmodifiableSet(sortAuthorities(authorities)); // 정렬 후 불변 Set으로 저장
    }

    // 권한을 정렬하여 반환하는 메서드
    private static SortedSet<GrantedAuthority> sortAuthorities(Collection<? extends GrantedAuthority> authorities) {
        Assert.notNull(authorities, "Cannot pass a null GrantedAuthority collection");
        SortedSet<GrantedAuthority> sortedAuthorities = new TreeSet<>(new AuthorityComparator());
        for (GrantedAuthority grantedAuthority : authorities) {
            Assert.notNull(grantedAuthority, "GrantedAuthority list cannot contain any null elements");
            sortedAuthorities.add(grantedAuthority);
        }
        return sortedAuthorities;
    }

    private static class AuthorityComparator implements Comparator<GrantedAuthority>, Serializable {

        private static final long serialVersionUID = SpringSecurityCoreVersion.SERIAL_VERSION_UID;

        @Override
        public int compare(GrantedAuthority g1, GrantedAuthority g2) {
            // Neither should ever be null as each entry is checked before adding it to
            // the set. If the authority is null, it is a custom authority and should
            // precede others.
            if (g2.getAuthority() == null) {
                return -1;
            }
            if (g1.getAuthority() == null) {
                return 1;
            }
            return g1.getAuthority().compareTo(g2.getAuthority());
        }

    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isEnabled() {
        return !this.disabled; // DB에 저장되어있는 활성화여부에 따라 설정
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // 기본 설정: 만료되지 않음
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // 기본 설정: 잠기지 않음
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // 기본 설정: 자격 증명 만료되지 않음
    }
}
