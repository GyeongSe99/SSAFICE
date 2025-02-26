package com.jetty.ssafficebe.mattermost.payload;

import com.jetty.ssafficebe.mattermost.payload.metadata.AcknowledgementSummary;
import com.jetty.ssafficebe.mattermost.payload.metadata.EmbedSummary;
import com.jetty.ssafficebe.mattermost.payload.metadata.EmojiSummary;
import com.jetty.ssafficebe.mattermost.payload.metadata.FileSummary;
import com.jetty.ssafficebe.mattermost.payload.metadata.PrioritySummary;
import com.jetty.ssafficebe.mattermost.payload.metadata.ReactionSummary;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class MetadataSummary {
  private List<EmbedSummary> embeds;
  private List<EmojiSummary> emojis;
  private List<FileSummary> files;
  private String images;
  private List<ReactionSummary> reactions;
  private PrioritySummary priority;
  private List<AcknowledgementSummary> acknowledgements;
}
