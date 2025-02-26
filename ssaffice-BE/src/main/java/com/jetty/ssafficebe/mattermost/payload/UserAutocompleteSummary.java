package com.jetty.ssafficebe.mattermost.payload;

import com.jetty.ssafficebe.mattermost.payload.notifyprops.PropsSummary;
import com.jetty.ssafficebe.mattermost.payload.timezone.TimezoneSummary;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserAutocompleteSummary {

    private String id;
    private long createAt;
    private long updateAt;
    private long deleteAt;
    private String username;
    private String authData;
    private String authService;
    private String email;
    private String nickname;
    private String firstname;
    private String lastname;
    private String position;
    private String roles;
    private PropsSummary props;
    private String lastPictureUpdate;
    private String locale;
    private TimezoneSummary timezone;
    private boolean disableWelcomeEmail;

}
