package com.jetty.ssafficebe.file.controller;

import com.jetty.ssafficebe.file.payload.AttachmentFileSummaryWithStream;
import com.jetty.ssafficebe.file.payload.UploadFileResponse;
import com.jetty.ssafficebe.file.service.AttachmentFileService;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/attachment-files")
@RequiredArgsConstructor
public class AttachmentFileController {

    private final AttachmentFileService attachmentFileService;

    /**
     * 파일을 스트림으로 다운로드
     *
     * @param fileId      다운로드할 파일의 고유 ID
     * @param fileType    파일의 유형을 검증하기 위한 파라미터
     */
    @GetMapping("{fileId}/types/{fileType}/download")
    public ResponseEntity<InputStreamResource> downloadAttachmentFileAsStream(@PathVariable String fileId,
                                                                              @PathVariable String fileType) throws IOException {

        // 파일 ID와 파일 타입을 기반으로 파일 정보를 가져옴
        AttachmentFileSummaryWithStream summary = this.attachmentFileService.getAttachmentFileWithInputStream(fileId, fileType);

        return ResponseEntity.ok()
                             .header(HttpHeaders.CONTENT_DISPOSITION,
                                     "attachment; filename=" + URLEncoder.encode(summary.getFileName(), StandardCharsets.UTF_8))
                             .contentLength(summary.getFileSize())
                             .contentType(summary.getMediaType())
                             .body(new InputStreamResource(summary.getInputStream()));
    }

    /**
     * 파일 업로드
     *
     * @param file    업로드할 파일
     * @param fileType 파일의 유형 (예: 이미지, 문서 등)
     * @param refId   파일이 참조하는 엔티티의 ID (공지ID, 일정ID 등)
     */
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<UploadFileResponse> uploadAttachmentFile(
            @RequestParam MultipartFile file,
            @RequestParam String fileType,
            @RequestParam Long refId) throws IOException {
        return ResponseEntity.ok(this.attachmentFileService.uploadFile(file, fileType, refId));
    }
}
