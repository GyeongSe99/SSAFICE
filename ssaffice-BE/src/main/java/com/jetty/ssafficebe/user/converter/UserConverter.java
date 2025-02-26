package com.jetty.ssafficebe.user.converter;

import com.jetty.ssafficebe.search.payload.ESUserRequest;
import com.jetty.ssafficebe.user.entity.User;
import com.jetty.ssafficebe.user.payload.CreatedBySummary;
import com.jetty.ssafficebe.user.payload.SsoInfo;
import com.jetty.ssafficebe.user.payload.SaveUserRequest;
import com.jetty.ssafficebe.user.payload.UpdateUserRequest;
import com.jetty.ssafficebe.user.payload.UserSummary;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE, unmappedTargetPolicy = ReportingPolicy.WARN)
public interface UserConverter {

    void updateUserForSSO(@MappingTarget User user, SaveUserRequest saveUserRequest);

    User toUser(SaveUserRequest saveUserRequest);

    UserSummary toUserSummary(User user);

    void updateUser(@MappingTarget User user, UpdateUserRequest updateUserRequest);

    CreatedBySummary toCreatedBySummary(User user);

    ESUserRequest toESUserRequest(User savedUser);

    List<UserSummary> toUserSummaryList(List<User> userList);

    SsoInfo toSsoInfo(User user);
}
