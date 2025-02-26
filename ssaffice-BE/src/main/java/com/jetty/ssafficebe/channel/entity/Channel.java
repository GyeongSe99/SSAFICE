package com.jetty.ssafficebe.channel.entity;

import com.jetty.ssafficebe.notice.entity.Notice;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
@Table(name = "channel")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Channel {

    @Id
    private String channelId;
    private String channelName;
    private String mmTeamId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mmTeamId", insertable = false, updatable = false)
    private MMTeam mmTeam;

    @OneToMany(mappedBy = "channel", fetch = FetchType.LAZY)
    private List<Notice> notices = new ArrayList<>();

    @OneToMany(mappedBy = "channel", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserChannel> userChannels = new HashSet<>();
}
