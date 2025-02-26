package com.jetty.ssafficebe.search.controller;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.search.document.ESUser;
import com.jetty.ssafficebe.search.payload.ESUserRequest;
import com.jetty.ssafficebe.search.payload.ESUserSearchFilter;
import com.jetty.ssafficebe.search.service.ESUserService;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/es/users")
@RequiredArgsConstructor
public class ESUserController {

    private final ESUserService esUserService;

    @PostMapping
    public ResponseEntity<ApiResponse> saveUser(@RequestBody ESUserRequest request) {
        return ResponseEntity.ok(esUserService.saveUser(request));
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long userId) {
        return ResponseEntity.ok(esUserService.deleteUser(userId));
    }

    @PostMapping("/search")
    public ResponseEntity<List<ESUser>> searchUser(@RequestBody ESUserSearchFilter request) throws IOException {
        return ResponseEntity.ok(esUserService.searchUser(request));
    }

}