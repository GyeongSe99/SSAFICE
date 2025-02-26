package com.jetty.ssafficebe.remind.entity;

import com.jetty.ssafficebe.common.jpa.BooleanToYNConverter;
import com.jetty.ssafficebe.remind.code.RemindType;
import com.jetty.ssafficebe.schedule.entity.Schedule;
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
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "remind")
public class Remind extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long remindId;

    @Builder.Default
    private String essentialYn = "N";

    @Convert(converter = BooleanToYNConverter.class)
    @Column(name = "essentialYn", updatable = false, insertable = false)
    private Boolean essential;

    @Builder.Default
    private String activeYn = "Y";

    @Convert(converter = BooleanToYNConverter.class)
    @Column(name = "activeYn", updatable = false, insertable = false)
    private Boolean active;

    private String remindTypeCd;

    @Enumerated(EnumType.STRING)
    @Column(name = "remindTypeCd", updatable = false, insertable = false)
    private RemindType remindType;

    private LocalDateTime remindDateTime;

    private Long scheduleId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "scheduleId", insertable = false, updatable = false)
    private Schedule schedule;
}
