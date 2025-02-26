package com.jetty.ssafficebe.file.provider.aws;

import com.amazonaws.services.s3.AmazonS3;

public abstract class AWSS3ClientProvider {

    protected AmazonS3 amazonS3;

    public abstract AmazonS3 getS3Client();
}
