package com.jetty.ssafficebe.notice.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class NoticeCounts {

    private Long total;
    private Long essential;
    private Long enrolled;
}
