package com.jetty.ssafficebe.mattermost.payload;

import com.jetty.ssafficebe.mattermost.payload.metadata.PrioritySummary;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MetadataRequest {
  private PrioritySummary priority;
}
