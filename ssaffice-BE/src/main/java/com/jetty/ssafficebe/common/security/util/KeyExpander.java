package com.jetty.ssafficebe.common.security.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class KeyExpander {
    public static byte[] expandKey(byte[] originalKey, int length) {
        MessageDigest digest = null;
        try {
            digest = MessageDigest.getInstance("SHA-512");
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
        byte[] expandedKey = new byte[length];
        byte[] hash = originalKey;

        for (int i = 0; i < length; i += hash.length) {
            hash = digest.digest(hash);
            System.arraycopy(hash, 0, expandedKey, i, Math.min(hash.length, length - i));
        }

        return expandedKey;
    }

}
