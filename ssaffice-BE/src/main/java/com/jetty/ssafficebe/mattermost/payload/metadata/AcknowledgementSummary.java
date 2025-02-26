package com.jetty.ssafficebe.mattermost.payload.metadata;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AcknowledgementSummary {
  private String userId;
  private String postId;
  private long acknowledgedAt;
}
