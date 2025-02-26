package com.jetty.ssafficebe.mattermost.payload.timezone;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TimezoneSummary {
	@JsonProperty("automaticTimezone")
	private String automaticTimezone;
	@JsonProperty("manualTimezone")
	private String manualTimezone;
	@JsonProperty("useAutomaticTimezone")
	private boolean useAutomaticTimezone;

}
