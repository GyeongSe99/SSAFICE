package com.jetty.ssafficebe.schedule.payload;

import com.jetty.ssafficebe.common.payload.BaseFilterRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public class ScheduleFilterRequest extends BaseFilterRequest {

    private String enrollYn;
    private String scheduleSourceTypeCd;
}
