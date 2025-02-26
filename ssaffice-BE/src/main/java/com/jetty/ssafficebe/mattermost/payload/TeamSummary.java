package com.jetty.ssafficebe.mattermost.payload;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TeamSummary {
	String id;
	@JsonProperty("create_at")
	long createAt;
	@JsonProperty("update_at")
	long updateAt;
	@JsonProperty("delete_at")
	long deleteAt;
	@JsonProperty("display_name")
	String displayName;
	String name;
	String description;
	String email;
	String type;
	@JsonProperty("allowed_domains")
	String allowedDomains;
	@JsonProperty("invite_id")
	String inviteId;
	@JsonProperty("allow_open_invite")
	Boolean allowOpenInvite;
	String policyId;

}
