package com.jetty.ssafficebe.remind.payload;

import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RemindRequest {

    private String essentialYn;
    @NotNull
    private String remindTypeCd;
    @NotNull
    private LocalDateTime remindDateTime;
    @NotNull
    private Long scheduleId;
}
