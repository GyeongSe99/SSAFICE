package com.jetty.ssafficebe.file.service;

import com.jetty.ssafficebe.file.converter.AttachmentFileConverter;
import com.jetty.ssafficebe.file.entity.AttachmentFile;
import com.jetty.ssafficebe.file.payload.AttachmentFileSummary;
import com.jetty.ssafficebe.file.payload.AttachmentFileSummaryWithStream;
import com.jetty.ssafficebe.file.payload.UploadFileResponse;
import com.jetty.ssafficebe.file.repository.AttachmentFileRepository;
import com.jetty.ssafficebe.file.storage.FileStorageService;
import com.jetty.ssafficebe.file.util.MimeUtil;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AttachmentFileServiceImpl implements AttachmentFileService {

    private final FileStorageService fileStorageService;
    private final AttachmentFileRepository attachmentFileRepository;
    private final AttachmentFileConverter attachmentFileConverter;

    @Override
    public UploadFileResponse uploadFile(MultipartFile file, String fileType, Long refId) throws IOException {
        String hash = this.fileStorageService.uploadFile(file);

        AttachmentFile attachmentFile = new AttachmentFile();

        attachmentFile.setFileName(file.getOriginalFilename());
        attachmentFile.setFileSize(file.getSize());
        attachmentFile.setMimeType(MimeUtil.getMimeType(file.getOriginalFilename()));
        attachmentFile.setRefId(refId);
        attachmentFile.setFileType(fileType);
        attachmentFile.setHash(hash);

        attachmentFile = this.attachmentFileRepository.save(attachmentFile);

        return this.attachmentFileConverter.toResponse(attachmentFile);
    }

    // TODO : Exception 처리
    @Override
    public AttachmentFileSummaryWithStream getAttachmentFileWithInputStream(String fileId, String fileType)
            throws IOException {
        AttachmentFile attachmentFile = this.attachmentFileRepository.getReferenceById(fileId);
        if (attachmentFile.isDeleted()) {
            throw new RuntimeException("이미 삭제된 첨부파일입니다.");
        }

        if (!attachmentFile.getFileType().equals(fileType)) {
            throw new RuntimeException("fileType이 일치하지 않습니다.");
        }

        AttachmentFileSummaryWithStream summary = this.attachmentFileConverter.toAttachmentFileSummaryWithStream(
                attachmentFile);
        summary.setInputStream(this.fileStorageService.getInputStream(attachmentFile.getHash()));
        return summary;
    }

    @Override
    @Transactional
    public void updateFileRefId(Long refId, String fileType, Collection<String> fileIds) {
        if (fileIds == null) {
            fileIds = new ArrayList<>();
        }
        HashSet<String> fileIdSet = new HashSet<>(fileIds);

        // DB에서 해당 참조 id로 파일 리스트 조회
        List<AttachmentFile> fileListByRefId =
                this.attachmentFileRepository.findAllByRefIdAndFileTypeAndDeletedYn(refId, fileType, "N");
        for (AttachmentFile attachmentFile : fileListByRefId) {
            if (fileIdSet.contains(attachmentFile.getFileId())) {
                fileIdSet.remove(attachmentFile.getFileId());
            } else {
                attachmentFile.setDeletedYn("Y");
            }
        }

        List<AttachmentFile> fileListToUpdateRefId = this.attachmentFileRepository.findAllByFileIdIn(fileIdSet);
        for (AttachmentFile attachmentFile : fileListToUpdateRefId) {
            attachmentFile.setRefId(refId);
            attachmentFile.setFileType(fileType);
            attachmentFile.setDeletedYn("N");
        }
    }

    @Override
    public List<AttachmentFileSummary> getAttachmentFilesSummaryByRefId(Long refId) {
        List<AttachmentFile> attachmentFiles = this.attachmentFileRepository.findAllByRefIdAndDeletedYn(refId, "N");
        return attachmentFileConverter.toAttachmentFileSummaryList(attachmentFiles);
    }
}
