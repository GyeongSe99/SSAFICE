package com.jetty.ssafficebe.file.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;

import java.util.HashMap;
import java.util.Map;

public class MimeUtil {
    public static final String DEFAULT_MIME_TYPE = "application/octet-stream";
    /**
     * 기본 mime type.
     */
    private static final Logger log = LoggerFactory.getLogger(MimeUtil.class);
    private static final Map<String, String> MIME_MAPPINGS = new HashMap<>(256);
    private static final String[] MIME_MAPPINGS_ARRAY = {
            "7z", "application/x-7z-compressed",
            "avi", "video/x-msvideo",
            "bmp", "image/bmp",
            "css", "text/css",
            "csv", "text/comma-separated-values",
            "doc", "application/msword",
            "docx", "application/msword",
            "gif", "image/gif",
            "gz", "application/x-gzip",
            "htc", "text/x-component",
            "htm", "text/html",
            "html", "text/html",
            "jpg", "image/jpeg",
            "jpe", "image/jpeg",
            "jpeg", "image/jpeg",
            "js", "application/x-javascript",
            "json", "application/json",
            "mid", "audio/mid",
            "mp3", "audio/mpeg",
            "mov", "video/quicktime",
            "mpg", "video/mpeg",
            "mpeg", "video/mpeg",
            "pdf", "application/pdf",
            "png", "image/png",
            "ppt", "application/vnd.ms-powerpoint",
            "pptx", "application/vnd.ms-powerpoint",
            "ra", "audio/x-pn-realaudio",
            "ram", "audio/x-pn-realaudio",
            "svg", "image/svg+xml",
            "swf", "application/x-shockwave-flash",
            "tar", "application/x-tar",
            "tif", "image/tiff",
            "tiff", "image/tiff",
            "txt", "text/plain",
            "wav", "audio/x-wav",
            "xls", "application/vnd.ms-excel",
            "xlsx", "application/vnd.ms-excel",
            "xml", "text/xml",
            "zip", "application/zip"
    };

    static {
        try {
            for (int i = 0; i < MIME_MAPPINGS_ARRAY.length; i += 2) {
                MIME_MAPPINGS.put(MIME_MAPPINGS_ARRAY[i], MIME_MAPPINGS_ARRAY[i + 1]);
            }
        } catch (Exception e) {
            log.error(e.getMessage(), e);
        }
    }

    private MimeUtil() {
        throw new IllegalStateException("Utility class");
    }

    /**
     * extension 에 해당되는 Mime type 을 구함.
     *
     * @param fileName file name.
     * @return extension 에 해당되는 Mime type
     */
    public static String getMimeType(String fileName) {
        String result = DEFAULT_MIME_TYPE;
        if (StringUtils.hasText(fileName)) {
            int idx = fileName.lastIndexOf('.');
            if (idx != -1) {
                result = MIME_MAPPINGS.get(fileName.substring(idx + 1).toLowerCase());
            }
        }
        return result == null ? DEFAULT_MIME_TYPE : result;
    }
}

