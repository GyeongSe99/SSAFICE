package com.jetty.ssafficebe.search.service;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.search.converter.ESUserConverter;
import com.jetty.ssafficebe.search.document.ESUser;
import com.jetty.ssafficebe.search.payload.ESUserRequest;
import com.jetty.ssafficebe.search.payload.ESUserSearchFilter;
import com.jetty.ssafficebe.search.repository.ESUserRepository;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ESUserServiceImpl implements ESUserService {

    private final ESUserRepository esUserRepository;
    private final ESUserConverter esUserConverter;

    @Override
    public ApiResponse saveUser(ESUserRequest request) {
        ESUser saved = esUserRepository.save(esUserConverter.toESUser(request));
        return new ApiResponse(true, "ES에 추가 성공", saved.getUserId());
    }

    @Override
    public ApiResponse deleteUser(Long userId) {
        esUserRepository.deleteById(userId);
        return new ApiResponse(true, "삭제 성공", userId);
    }

    @Override
    public List<ESUser> searchUser(ESUserSearchFilter request) throws IOException {
        return esUserRepository.searchUsers(request.getKeyword());
    }
}
