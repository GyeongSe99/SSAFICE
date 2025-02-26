package com.jetty.ssafficebe.mattermost.payload;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DirectMessageRequest {
  private Long scheduleId;
  private List<Long> userIds;
}
