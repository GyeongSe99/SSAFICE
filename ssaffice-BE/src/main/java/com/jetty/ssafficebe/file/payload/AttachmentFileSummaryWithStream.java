package com.jetty.ssafficebe.file.payload;

import java.io.InputStream;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;

@Getter
@Setter
public class AttachmentFileSummaryWithStream {
    private String fileId;
    private String fileName;
    private long fileSize;
    private String mimeType;
    private InputStream inputStream;

    public MediaType getMediaType() {
        return StringUtils.hasText(this.mimeType) && this.mimeType.startsWith("image") ?
               MediaType.valueOf(this.mimeType) : MediaType.APPLICATION_OCTET_STREAM;
    }
}
