package com.jetty.ssafficebe.role.controller;

import com.jetty.ssafficebe.common.payload.ApiResponse;
import com.jetty.ssafficebe.role.payload.RoleAssignmentRequest;
import com.jetty.ssafficebe.role.payload.RoleDTO;
import com.jetty.ssafficebe.role.payload.RoleSummarySimple;
import com.jetty.ssafficebe.role.service.RoleService;
import com.jetty.ssafficebe.user.payload.UserSummary;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/roles")
@RequiredArgsConstructor
public class RoleController {

    private final RoleService roleService;

    /**
     * 등록되어있는 역할군 출력. 역할군별 유저 조회시 태그 선택 리스트가 필요할 경우
     *
     * @return List<RoleSummarySimple> { "roleId" : "ROLE_USER", "ROLE_ADMIN", "ROLE_SYSADMIN", "description" : "학생",
     * "프로", "시스템 관리자" }
     */
    @GetMapping(params = "dataType=simple")
    public ResponseEntity<List<RoleSummarySimple>> getRoleSimpleList() {
        return ResponseEntity.ok(this.roleService.getRoleList());
    }

    /**
     * 역할 ID에 사용자 ID 목록을 할당하여 역할을 부여.
     *
     * @param roleId  역할을 할당할 역할 ID (예: "ROLE_ADMIN")
     * @param request 역할이 할당될 사용자 ID 목록 (예: { "userIds": [1, 2, 3] })
     */
    @PutMapping("/{roleId}")
    public ResponseEntity<ApiResponse> assignRoleToUsers(@PathVariable String roleId,
                                                         @RequestBody RoleAssignmentRequest request) {
        ApiResponse apiResponse = this.roleService.assignRoleToUsers(roleId, request);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    /**
     * 역할 추가
     *
     * @param request { "roleId" : "ROLE_USER", "description" : "학생" }
     * @return ApiResponse { "success" : true, "status" : 201, "message" : "역할이 추가되었습니다." }
     */
    @PostMapping
    public ResponseEntity<ApiResponse> saveRole(@RequestBody RoleDTO request) {
        ApiResponse apiResponse = this.roleService.saveRole(request);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    /**
     * 역할 삭제
     *
     * @param roleId 삭제할 역할 ID (예: "ROLE_USER")
     */
    @DeleteMapping("/{roleId}")
    public ResponseEntity<ApiResponse> deleteRole(@PathVariable String roleId) {
        ApiResponse apiResponse = this.roleService.deleteRole(roleId);
        return ResponseEntity.status(apiResponse.getStatus()).body(apiResponse);
    }

    /**
     * 역할 별 유저 목록 조회.
     *
     * @param roleId 역할 ID (예: "ROLE_USER")
     * @param pageable 페이지 정보 (default: 0, 20, "userId", ASC)
     *                 - page: 0
     *                 - size: 20
     *                 - sort: "userId"
     *                 - direction: ASC
     * @return Page<UserSummary>
     */
    @GetMapping("/{roleId}/users")
    public ResponseEntity<Page<UserSummary>> getUserListByRole(@PathVariable String roleId,
                                                               @PageableDefault(
                                                                size = 20,
                                                                sort = "userId",
                                                                direction = Direction.ASC) Pageable pageable) {

        return ResponseEntity.ok(this.roleService.getUserListByRole(roleId, pageable));
    }
}
