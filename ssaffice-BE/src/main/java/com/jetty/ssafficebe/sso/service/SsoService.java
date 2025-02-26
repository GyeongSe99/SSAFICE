package com.jetty.ssafficebe.sso.service;


import com.jetty.ssafficebe.sso.payload.SsoAuthToken;
import com.jetty.ssafficebe.user.payload.UserRequestForSso;

public interface SsoService {
    String getAuthCodeRequestUrl();

    SsoAuthToken getSsoAuthToken(String code);

    UserRequestForSso getLoginUserInfo(SsoAuthToken token);
}
