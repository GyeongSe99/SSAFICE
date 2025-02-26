package com.jetty.ssafficebe.mattermost.payload.metadata;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReactionSummary {
  private String userId;
  private String postId;
  private String emojiName;
  private long createAt;
}
