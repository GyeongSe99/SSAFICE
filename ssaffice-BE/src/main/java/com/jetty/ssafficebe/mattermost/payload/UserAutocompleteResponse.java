package com.jetty.ssafficebe.mattermost.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAutocompleteResponse {

    @JsonProperty("users")
    private List<UserAutocompleteSummary> users;
}
