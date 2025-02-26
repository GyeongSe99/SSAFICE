package com.jetty.ssafficebe.file.repository;

import com.jetty.ssafficebe.file.entity.AttachmentFile;
import java.util.Collection;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AttachmentFileRepository extends JpaRepository<AttachmentFile, String> {

    List<AttachmentFile> findAllByFileIdIn(Collection<String> fileIdSet);

    List<AttachmentFile> findAllByRefIdAndFileTypeAndDeletedYn(Long refId, String fileType, String isDeletedYn);

    List<AttachmentFile> findAllByRefIdAndDeletedYn(Long refId, String isDeletedYn);
}
