package com.jetty.ssafficebe.mattermost.payload;

import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostUpdateRequest {
  private String id;
  private boolean isPinned;
  private String message;
  private boolean hasReactions;
  private Map<String, String> props;
}
