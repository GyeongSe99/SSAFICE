package com.jetty.ssafficebe.file.service;

import com.jetty.ssafficebe.file.payload.AttachmentFileSummary;
import com.jetty.ssafficebe.file.payload.AttachmentFileSummaryWithStream;
import com.jetty.ssafficebe.file.payload.UploadFileResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface AttachmentFileService {

    UploadFileResponse uploadFile(MultipartFile file, String fileType, Long refId) throws IOException;

    AttachmentFileSummaryWithStream getAttachmentFileWithInputStream(String fileId, String fileType) throws IOException;

    void updateFileRefId(Long refId, String fileType, Collection<String> fileIds);

    List<AttachmentFileSummary> getAttachmentFilesSummaryByRefId(Long refId);
}
