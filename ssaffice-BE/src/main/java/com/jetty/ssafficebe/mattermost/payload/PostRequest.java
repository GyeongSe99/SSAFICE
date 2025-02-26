package com.jetty.ssafficebe.mattermost.payload;

import java.util.List;
import java.util.Map;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostRequest {
  private String channelId;
  private String message;
  private String rootId;
  private List<String> fileIds;
  private Map<String, String> props;
  private MetadataRequest metadata;
}
