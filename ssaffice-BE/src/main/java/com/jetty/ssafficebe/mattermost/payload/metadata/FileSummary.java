package com.jetty.ssafficebe.mattermost.payload.metadata;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FileSummary {
  private String id;
  private String userId;
  private String postId;
  private long createAt;
  private long updateAt;
  private long deleteAt;
  private String name;
  private String extension;
  private int size;
  private String mimeType;
  private int width;
  private int height;
  private boolean hasPreviewImage;
}
