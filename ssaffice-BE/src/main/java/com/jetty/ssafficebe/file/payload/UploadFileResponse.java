package com.jetty.ssafficebe.file.payload;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UploadFileResponse {
    private String fileId;
    private String fileType;
    private String refId;
    private String fileName;
}
