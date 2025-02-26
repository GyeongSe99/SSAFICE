package com.jetty.ssafficebe.file.payload;

import lombok.Getter;
import lombok.Setter;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;

@Getter
@Setter
public class AttachmentFileSummary {

    private String fileId;
    private String fileName;
    private long fileSize;
    private String mimeType;


    public MediaType getMediaType() {
        return StringUtils.hasText(this.mimeType) && this.mimeType.startsWith("image") ?
               MediaType.valueOf(this.mimeType) : MediaType.APPLICATION_OCTET_STREAM;
    }

}
