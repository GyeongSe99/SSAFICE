package com.jetty.ssafficebe.user.entity;

import com.jetty.ssafficebe.channel.entity.UserChannel;
import com.jetty.ssafficebe.common.jpa.BooleanToYNConverter;
import com.jetty.ssafficebe.role.entity.UserRole;
import com.jetty.ssafficebe.user.code.Region;
import com.jetty.ssafficebe.user.code.Track;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    private String email;

    private String password;

    private String name;

    private String profileImgUrl;

    private String ssafyUUID;

    private String disabledYn = "N";

    @Convert(converter = BooleanToYNConverter.class)
    @Column(name = "disabledYn", updatable = false, insertable = false)
    private boolean disabled;

    private Integer cohortNum;

    private String trackCd;

    @Enumerated(EnumType.STRING)
    @Column(name = "trackCd", updatable = false, insertable = false)
    private Track track;

    private String regionCd;

    @Enumerated(EnumType.STRING)
    @Column(name = "regionCd", updatable = false, insertable = false)
    private Region region;

    private Integer classNum;

    // TODO : mm 채널 동기화 버튼 눌렀을때 시간 갱신하는 로직 구현
    private LocalDateTime recentMmChannelSyncTime;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<UserRole> userRoles = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private Set<UserChannel> userChannels = new HashSet<>();

    // mattermostId와 Token값을 저장하기 위한 필드
    private String mattermostToken;

    private String mattermostUserId;

}
