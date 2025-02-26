package com.jetty.ssafficebe.file.storage;

import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import com.jetty.ssafficebe.file.provider.aws.AWSS3ClientProviderForAttachment;
import com.jetty.ssafficebe.file.util.ResourceHashUtil;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class AWSS3FileStorageService implements FileStorageService {

    private final AWSS3ClientProviderForAttachment awsS3ClientProviderForAttachment;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucket = "";

    @Value("${app.cloud.aws.s3.key.prefix}")
    private String keyPrefix = "";

    @Override
    public String uploadFile(MultipartFile file) throws IOException {
        // 파일 내용을 기반으로 hash값 생성.
        String hash = ResourceHashUtil.generateHash(file.getInputStream());
        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(file.getContentType());
        objectMetaData.setContentLength(file.getSize());
        awsS3ClientProviderForAttachment.getS3Client()
                                        .putObject(new PutObjectRequest(bucket,
                                                                        this.getTargetPath(hash),
                                                                        file.getInputStream(),
                                                                        objectMetaData));

        return hash;
    }

    @Override
    public byte[] getBytes(String hash) throws IOException {
        S3Object object =
                awsS3ClientProviderForAttachment.getS3Client()
                                                .getObject(new GetObjectRequest(bucket, this.getTargetPath(hash)));
        S3ObjectInputStream objectInputStream = object.getObjectContent();
        return IOUtils.toByteArray(objectInputStream);
    }

    @Override
    public InputStream getInputStream(String hash) {
        S3Object object =
                awsS3ClientProviderForAttachment.getS3Client()
                                                .getObject(new GetObjectRequest(bucket, this.getTargetPath(hash)));
        return object.getObjectContent();
    }

    @Override
    public void deleteFile(String hash) {
        this.awsS3ClientProviderForAttachment.getS3Client().deleteObject(new DeleteObjectRequest(bucket,
                                                                                                 this.getTargetPath(
                                                                                                         hash)));
    }

    private String getTargetPath(String hash) {
        return Paths.get(keyPrefix, ResourceHashUtil.getDirPath(hash), ResourceHashUtil.getFilePath(hash)).toString();
    }

    @Override
    public String uploadProfileImage(MultipartFile file) throws IOException {
        String hash = ResourceHashUtil.generateHash(file.getInputStream());
        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(file.getContentType());
        objectMetaData.setContentLength(file.getSize());
        awsS3ClientProviderForAttachment.getS3Client()
                                        .putObject(new PutObjectRequest(bucket,
                                                                        this.getTargetPath(hash),
                                                                        file.getInputStream(),
                                                                        objectMetaData).withCannedAcl(
                                                CannedAccessControlList.PublicRead));

        return awsS3ClientProviderForAttachment.getS3Client().getUrl(bucket, this.getTargetPath(hash))
                                                        .toString();
    }


}
