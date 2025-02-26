package com.jetty.ssafficebe.mattermost.payload.metadata;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmojiSummary {
  private String id;
  private String creatorId;
  private String name;
  private long createAt;
  private long updateAt;
  private long deleteAt;
}
