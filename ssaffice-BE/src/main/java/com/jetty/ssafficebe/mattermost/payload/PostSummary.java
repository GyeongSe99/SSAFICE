package com.jetty.ssafficebe.mattermost.payload;

import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostSummary {
  private String id;
  private long createAt;
  private long updateAt;
  private long deleteAt;
  private long editAt;
  private String userId;
  private String channelId;
  private String rootId;
  private String originalId;
  private String message;
  private String type;
  private Map<String, String> props;
  private String hashtag;
  private List<String> fileIds;
  private String pendingPostId;
  private MetadataSummary metadata;
}
