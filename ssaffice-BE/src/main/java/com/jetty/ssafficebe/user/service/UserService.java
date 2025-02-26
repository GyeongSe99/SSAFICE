package com.jetty.ssafficebe.user.service;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.user.entity.User;
import com.jetty.ssafficebe.user.payload.SsoInfo;
import com.jetty.ssafficebe.user.payload.SaveUserRequest;
import com.jetty.ssafficebe.user.payload.UpdatePasswordRequest;
import com.jetty.ssafficebe.user.payload.UpdateUserRequest;
import com.jetty.ssafficebe.user.payload.UserRequestForSso;
import com.jetty.ssafficebe.user.payload.UserSummary;
import java.io.IOException;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    ApiResponse saveUser(Long userId, SaveUserRequest saveUserRequest);

    UserSummary getUserSummary(Long userId);

    SsoInfo getSSOInfo(Long userId);

    ApiResponse updateUser(Long userId, UpdateUserRequest saveUserRequest);

    ApiResponse deleteUsers(List<Long> userIds);

    Page<UserSummary> getUserPage(String channelId, Pageable pageable);

    ApiResponse updatePassword(Long userId, UpdatePasswordRequest updatePasswordRequest);

    ApiResponse updateProfileImg(Long userId, MultipartFile profileImg) throws IOException;

    List<Long> getUserIdsByChannelId(String channelId);

    String handleSsoLogin(UserRequestForSso userRequest);

    User saveUserForSso(UserRequestForSso userRequest);

    void saveLastRefreshTime(Long userId);

}
