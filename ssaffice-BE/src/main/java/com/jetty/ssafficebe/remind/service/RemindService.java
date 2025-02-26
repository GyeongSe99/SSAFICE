package com.jetty.ssafficebe.remind.service;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.remind.payload.RemindRequest;

public interface RemindService {

    ApiResponse saveRemind(Long userId, RemindRequest remindRequest);

    ApiResponse deleteRemind(Long userId, Long remindId);
}
