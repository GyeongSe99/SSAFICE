package com.jetty.ssafficebe.user.service;

import com.jetty.ssafficebe.channel.entity.UserChannel;
import com.jetty.ssafficebe.channel.respository.UserChannelRepository;
import com.jetty.ssafficebe.common.exception.ErrorCode;
import com.jetty.ssafficebe.common.exception.exceptiontype.DuplicateValueException;
import com.jetty.ssafficebe.common.exception.exceptiontype.InvalidValueException;
import com.jetty.ssafficebe.common.exception.exceptiontype.ResourceNotFoundException;
import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.file.storage.FileStorageService;
import com.jetty.ssafficebe.role.converter.RoleConverter;
import com.jetty.ssafficebe.role.entity.Role;
import com.jetty.ssafficebe.role.entity.UserRole;
import com.jetty.ssafficebe.role.payload.RoleSummarySimple;
import com.jetty.ssafficebe.role.repository.RoleRepository;
import com.jetty.ssafficebe.role.repository.UserRoleRepository;
import com.jetty.ssafficebe.search.payload.ESUserRequest;
import com.jetty.ssafficebe.search.service.ESUserService;
import com.jetty.ssafficebe.user.converter.UserConverter;
import com.jetty.ssafficebe.user.entity.User;
import com.jetty.ssafficebe.user.payload.SaveUserRequest;
import com.jetty.ssafficebe.user.payload.SsoInfo;
import com.jetty.ssafficebe.user.payload.UpdatePasswordRequest;
import com.jetty.ssafficebe.user.payload.UpdateUserRequest;
import com.jetty.ssafficebe.user.payload.UserRequestForSso;
import com.jetty.ssafficebe.user.payload.UserSummary;
import com.jetty.ssafficebe.user.repository.UserRepository;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserConverter userConverter;

    private final UserRoleRepository userRoleRepository;
    private final RoleRepository roleRepository;
    private final RoleConverter roleConverter;

    private final UserChannelRepository userChannelRepository;

    private final FileStorageService fileStorageService;

    private final ESUserService esUserService;

    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public ApiResponse saveUser(Long userId, SaveUserRequest saveUserRequest) {
        if (userRepository.existsByEmail(saveUserRequest.getEmail())) {
            throw new DuplicateValueException(ErrorCode.EMAIL_ALREADY_EXISTS, "email", saveUserRequest.getEmail());
        }

        User user;

        if (userId == null) {
            // 일반 유저 생성
            user = userConverter.toUser(saveUserRequest);
        } else {
            // SSO 유저 생성
            user = userRepository.findById(userId).orElseThrow(
                    () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", userId));
            userConverter.updateUserForSSO(user, saveUserRequest);
            user.setDisabledYn("N");
        }

        user.setPassword(passwordEncoder.encode(saveUserRequest.getPassword()));

        User savedUser = userRepository.save(user);

        // 유저-역할 테이블에 유저-역할 매핑 추가. 잘못된 역할 입력 시 skip.
        this.assignRolesToUser(savedUser.getUserId(), saveUserRequest.getRoleIds());

        // Elasticsearch에 유저 정보 추가
        ESUserRequest esUserRequest = userConverter.toESUserRequest(savedUser);
        esUserService.saveUser(esUserRequest);

        return new ApiResponse(true, HttpStatus.CREATED, "유저 추가 성공", user.getUserId());
    }

    /**
     * 사용자와 역할을 매핑하는 메서드
     */
    private void assignRolesToUser(Long userId, List<String> roleIds) {
        // 기존 역할 제거
        userRoleRepository.deleteAllByUserId(userId);

        // 새로운 역할 추가
        for (String roleId : roleIds) {
            if (roleRepository.existsById(roleId)) {
                userRoleRepository.save(UserRole.builder()
                                                .userId(userId)
                                                .roleId(roleId)
                                                .build());
            }
        }
    }

    @Override
    public UserSummary getUserSummary(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", userId));

        UserSummary userSummary = userConverter.toUserSummary(user);

        List<RoleSummarySimple> userRoles = user.getUserRoles().stream().map(userRole -> {
            Role role = userRole.getRole();
            return roleConverter.toRoleSummarySimple(role);
        }).toList();

        userSummary.setRoles(userRoles);

        return userSummary;
    }

    @Override
    public SsoInfo getSSOInfo(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", userId));

        return userConverter.toSsoInfo(user);
    }

    @Transactional
    @Override
    public ApiResponse updateUser(Long userId, UpdateUserRequest updateUserRequest) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", userId));

        userConverter.updateUser(user, updateUserRequest);

        User updatedUser = userRepository.save(user);

        return new ApiResponse(true, HttpStatus.OK, "유저 정보 수정 성공", updatedUser.getUserId());
    }

    @Transactional
    @Override
    public ApiResponse deleteUsers(List<Long> userIds) {
        for (Long userId : userIds) {
            userRepository.deleteById(userId);
        }
        return new ApiResponse(true, HttpStatus.OK, "유저 삭제 성공");
    }

    @Override
    public Page<UserSummary> getUserPage(String channelId, Pageable pageable) {
        Page<User> usersPageByFilter = this.userRepository.getUsersByChannelId(channelId, pageable);
        return usersPageByFilter.map(user -> {
            UserSummary userSummary = this.userConverter.toUserSummary(user);

            List<RoleSummarySimple> userRoles = user.getUserRoles().stream().map(userRole -> {
                Role role = userRole.getRole();
                return roleConverter.toRoleSummarySimple(role);
            }).toList();

            userSummary.setRoles(userRoles);

            return userSummary;
        });
    }

    @Transactional
    @Override
    public ApiResponse updatePassword(Long userId, UpdatePasswordRequest updatePasswordRequest) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", userId));

        if (!passwordEncoder.matches(updatePasswordRequest.getOldPassword(), user.getPassword())) {
            throw new InvalidValueException(ErrorCode.INVALID_PASSWORD, "password", null);
        }

        // 새 비밀번호 암호화 및 업데이트
        user.setPassword(passwordEncoder.encode(updatePasswordRequest.getNewPassword()));
        userRepository.save(user);
        return new ApiResponse(true, HttpStatus.OK, "비밀번호 변경 성공");
    }

    @Override
    public ApiResponse updateProfileImg(Long userId, MultipartFile profileImg) throws IOException {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", userId));

        // 프로필 이미지 s3 업로드 하여 hash값 가져오기
        String profileImgUrl = fileStorageService.uploadProfileImage(profileImg);

        // 프로필 이미지 url 업데이트
        user.setProfileImgUrl(profileImgUrl);
        userRepository.save(user);

        // Elasticsearch에 유저 정보 업데이트
        ESUserRequest esUserRequest = userConverter.toESUserRequest(user);
        esUserService.saveUser(esUserRequest);

        return new ApiResponse(true, HttpStatus.OK, "프로필 이미지 변경 성공");
    }

    @Override
    public List<Long> getUserIdsByChannelId(String channelId) {
        List<UserChannel> byChannelId = this.userChannelRepository.findByChannelId(channelId);
        if (byChannelId != null) {
            return byChannelId.stream()
                              .map(UserChannel::getUserId)
                              .toList();
        }
        return null;
    }

    /**
     * SSO 로그인 처리 메서드. 현재는 User테이블의 SsafyUUID로 로그인 처리하도록 구현되어 있지만, 실제로는 DB에 여러개의 SSO 서버(네이버, 구글, 카카오 등)의 유저Id를 저장하고
     * SSOId 리스트를 가져와 확인하는 로그인 처리를 위한 로직을 구현해야 함.
     */
    @Override
    public String handleSsoLogin(UserRequestForSso userRequest) {
        User existingUser = userRepository.findBySsafyUUID(userRequest.getUserId()).orElse(null);
        if (Objects.isNull(existingUser) || existingUser.getPassword() == null) {
            return null;
        }
        return existingUser.getEmail();
    }

    @Override
    public User saveUserForSso(UserRequestForSso userRequest) {
        User user = userRepository.findBySsafyUUID(userRequest.getUserId()).orElse(new User());
        user.setSsafyUUID(userRequest.getUserId());
        user.setDisabledYn("N");
        user.setEmail(userRequest.getLoginId());
        user.setName(userRequest.getName());
        return this.userRepository.save(user);
    }

    @Override
    public void saveLastRefreshTime(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(
                () -> new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", userId));
        user.setRecentMmChannelSyncTime(LocalDateTime.now());
        userRepository.save(user);
    }

}
