package com.jetty.ssafficebe.remind.payload;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RemindSummary {

    private Long remindId;
    private String remindTypeCd;
    private LocalDateTime remindDateTime;
}
