package com.jetty.ssafficebe.file.util;

import org.springframework.util.StringUtils;

import java.io.IOException;
import java.io.InputStream;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

public class ResourceHashUtil {

    private static final int BUFFER_SIZE = 8192;
    private static final int DIR_LENGTH = 2;

    private ResourceHashUtil() {
        throw new IllegalStateException("Utility class");
    }

    public static String generateHash(InputStream inputStream) throws IOException {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] buffer = new byte[BUFFER_SIZE];
            int length;
            while ((length = inputStream.read(buffer)) != -1) {
                digest.update(buffer, 0, length);
            }
            byte[] hash = digest.digest();
            return Base64.getUrlEncoder().withoutPadding().encodeToString(hash);
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("Could not find the algorithm", e);
        }
    }

    public static String getDirPath(String hash) {
        if (!StringUtils.hasText(hash)) {
            throw new RuntimeException("Hash is EMPTY");
        }

        return hash.substring(0, DIR_LENGTH);
    }

    public static String getFilePath(String hash) {
        if (!StringUtils.hasText(hash)) {
            throw new RuntimeException("Hash is EMPTY");
        }

        return hash.substring(DIR_LENGTH);
    }
}
