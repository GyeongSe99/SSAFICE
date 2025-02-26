package com.jetty.ssafficebe.notice.entity;

import com.jetty.ssafficebe.channel.entity.Channel;
import com.jetty.ssafficebe.common.jpa.BooleanToYNConverter;
import com.jetty.ssafficebe.notice.code.NoticeType;
import com.jetty.ssafficebe.user.entity.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "notice")
@Getter
@Setter
public class Notice extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long noticeId;

    private String mmMessageId;

    private String title;

    @Lob
    private String content;

    private LocalDateTime startDateTime;

    private LocalDateTime endDateTime;

    private String noticeTypeCd;

    @Enumerated(EnumType.STRING)
    @Column(name = "noticeTypeCd", updatable = false, insertable = false)
    private NoticeType noticeType;

    private String essentialYn = "N";

    @Convert(converter = BooleanToYNConverter.class)
    @Column(name = "essentialYn", updatable = false, insertable = false)
    private boolean essential;

    private String channelId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "channelId", insertable = false, updatable = false)
    private Channel channel;

}
