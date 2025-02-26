package com.jetty.ssafficebe.role.service;

import com.jetty.ssafficebe.common.exception.ErrorCode;
import com.jetty.ssafficebe.common.exception.exceptiontype.DuplicateValueException;
import com.jetty.ssafficebe.common.exception.exceptiontype.ResourceNotFoundException;
import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.common.utils.CollectionUtil;
import com.jetty.ssafficebe.role.converter.RoleConverter;
import com.jetty.ssafficebe.role.entity.Role;
import com.jetty.ssafficebe.role.entity.UserRole;
import com.jetty.ssafficebe.role.payload.RoleAssignmentRequest;
import com.jetty.ssafficebe.role.payload.RoleDTO;
import com.jetty.ssafficebe.role.payload.RoleSummarySimple;
import com.jetty.ssafficebe.role.repository.RoleRepository;
import com.jetty.ssafficebe.user.converter.UserConverter;
import com.jetty.ssafficebe.user.entity.User;
import com.jetty.ssafficebe.user.payload.UserSummary;
import com.jetty.ssafficebe.user.repository.UserRepository;
import java.util.List;
import java.util.function.Function;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class RoleServiceImpl implements RoleService {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final RoleConverter roleConverter;
    private final UserConverter userConverter;

    @Override
    public List<RoleSummarySimple> getRoleList() {
        return CollectionUtil.transform(this.roleRepository.findAll(), this.roleConverter::toRoleSummarySimple);
    }

    @Override
    @Transactional
    public ApiResponse assignRoleToUsers(String roleId, RoleAssignmentRequest request) {
        Role role;
        if (!roleRepository.existsById(roleId)) {
            throw new ResourceNotFoundException(ErrorCode.ROLE_NOT_FOUND, "roleId", roleId);
        }
        role = this.roleRepository.getReferenceById(roleId);

        CollectionUtil.deleteOrUpdateOrInsert(
                role.getUserRoles(),                // 원본: 현재 역할에 할당된 사용자 목록
                request.getUserIds(),             // 업데이트 대상: 요청으로 들어온 사용자 ID 목록
                UserRole::getUserId,              // 원본 Key 함수: UserRole의 userId
                Function.identity(),              // 업데이트 대상 Key 함수: 단순한 userId
                null, // 삭제 함수
                null, // 업데이트 함수 (필요 없으면 비워 둠)
                userId -> {
                    if (this.userRepository.existsById(userId)) {
                        UserRole userRole = new UserRole();
                        userRole.setRoleId(roleId);
                        userRole.setUserId(userId);
                        role.getUserRoles().add(userRole);
                        return userRole;
                    } else {
                        throw new ResourceNotFoundException(ErrorCode.USER_NOT_FOUND, "userId", userId);
                    }
                }
        );

        return new ApiResponse(true, HttpStatus.CREATED, "역할 할당이 완료되었습니다.", role.getRoleId());
    }


    @Override
    @Transactional
    public ApiResponse saveRole(RoleDTO request) {
        if (this.roleRepository.existsById(request.getRoleId())) {
            throw new DuplicateValueException(ErrorCode.ROLE_ALREADY_EXISTS, "roleId", request.getRoleId());
        }

        Role role = this.roleConverter.toRole(request);
        Role savedRole = this.roleRepository.save(role);
        return new ApiResponse(true, HttpStatus.CREATED, "역할이 생성되었습니다.", savedRole);
    }


    @Override
    @Transactional
    public ApiResponse deleteRole(String roleId) {
        if (!this.roleRepository.existsById(roleId)) {
            throw new ResourceNotFoundException(ErrorCode.ROLE_NOT_FOUND, "roleId", roleId);
        }

        this.roleRepository.deleteById(roleId);
        return new ApiResponse(true, HttpStatus.OK, "역할이 삭제되었습니다.", roleId);
    }

    // 역할 별 유저 목록 조회
    @Override
    public Page<UserSummary> getUserListByRole(String roleId, Pageable pageable) {
        if (!this.roleRepository.existsById(roleId)) {
            throw new ResourceNotFoundException(ErrorCode.ROLE_NOT_FOUND, "roleId", roleId);
        }

        // roleId로 유저 목록 조회
        Page<User> usersPage = userRepository.findUsersByRoleId(roleId, pageable);

        // UserSummary 형태로 변환 후 리턴
        return usersPage.map(user -> {
            UserSummary userSummary = this.userConverter.toUserSummary(user);

            List<RoleSummarySimple> userRoles = user.getUserRoles().stream().map(userRole -> {
                Role role = userRole.getRole();
                return roleConverter.toRoleSummarySimple(role);
            }).toList();

            userSummary.setRoles(userRoles);

            return userSummary;
        });
    }

}
