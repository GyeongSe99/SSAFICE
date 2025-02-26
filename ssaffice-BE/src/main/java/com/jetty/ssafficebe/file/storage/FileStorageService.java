package com.jetty.ssafficebe.file.storage;

import java.io.IOException;
import java.io.InputStream;
import org.springframework.web.multipart.MultipartFile;

public interface FileStorageService {

    String uploadFile(MultipartFile file) throws IOException;

    byte[] getBytes(String hash) throws IOException;

    InputStream getInputStream(String hash) throws IOException;

    void deleteFile(String hash) throws IOException;

    String uploadProfileImage(MultipartFile file) throws IOException;
}
