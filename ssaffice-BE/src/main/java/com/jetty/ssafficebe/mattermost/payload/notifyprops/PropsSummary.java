package com.jetty.ssafficebe.mattermost.payload.notifyprops;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PropsSummary {
	@JsonProperty("customStatus")
	private String customStatus;
	private String lastSearchPointer;
}
