package com.jetty.ssafficebe.file.provider.aws;

import com.amazonaws.auth.AWSCredentialsProvider;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
public class AWSS3ClientProviderForAttachment extends AWSS3ClientProvider {

    @Value("${spring.cloud.aws.credentials.access-key}")
    private String accessKey = "";

    @Value("${spring.cloud.aws.credentials.secret-key}")
    private String secretKey = "";

    @Value("${spring.cloud.aws.region.static}")
    private String region = "";

    @PostConstruct
    private void init() {
        AWSCredentialsProvider creds = new AWSStaticCredentialsProvider(new BasicAWSCredentials(accessKey, secretKey));
        this.amazonS3 = AmazonS3ClientBuilder.standard()
                .withRegion(this.region)
                .withCredentials(creds)
                .build();
    }

    @Override
    public AmazonS3 getS3Client() {
        return this.amazonS3;
    }
}
