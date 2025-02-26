package com.jetty.ssafficebe.search.service;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.search.document.ESUser;
import com.jetty.ssafficebe.search.payload.ESUserRequest;
import com.jetty.ssafficebe.search.payload.ESUserSearchFilter;
import java.io.IOException;
import java.util.List;

public interface ESUserService {

    ApiResponse saveUser(ESUserRequest request);

    ApiResponse deleteUser(Long userId);

    List<ESUser> searchUser(ESUserSearchFilter request) throws IOException;
}
