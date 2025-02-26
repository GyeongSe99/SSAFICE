package com.jetty.ssafficebe.channel.entity;

import com.jetty.ssafficebe.user.entity.User;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_channel")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserChannel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userChannelId;

    @ManyToOne
    @JoinColumn(name = "userId", insertable = false, updatable = false)
    private User user;
    private Long userId;

    @ManyToOne
    @JoinColumn(name = "channelId", insertable = false, updatable = false)
    private Channel channel;
    private String channelId;

    public UserChannel(Long userId, String channelId) {
        this.userId = userId;
        this.channelId = channelId;
    }

}
