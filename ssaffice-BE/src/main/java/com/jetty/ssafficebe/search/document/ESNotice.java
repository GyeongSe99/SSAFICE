package com.jetty.ssafficebe.search.document;

import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;
import org.springframework.format.annotation.DateTimeFormat;

@Getter
@Setter
@Document(indexName = "notice")
@Mapping(mappingPath = "/elasticsearch/notice-mappings.json")
@Setting(settingPath = "/elasticsearch/notice-settings.json")
public class ESNotice {

    @Id
    @Field(type = FieldType.Keyword)
    private Long noticeId;

    @Field(type = FieldType.Text)
    private String title;

    @Field(type = FieldType.Text)
    private String content;

    @Field(type = FieldType.Date, format = {}, pattern = "uuuu-MM-dd'T'HH:mm:ss")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;

    @Field(type = FieldType.Date, format = {}, pattern = "uuuu-MM-dd'T'HH:mm:ss")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime startDateTime;

    @Field(type = FieldType.Date, format = {}, pattern = "uuuu-MM-dd'T'HH:mm:ss")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime endDateTime;

    @Field(type = FieldType.Keyword)
    private String isEssentialYn;

    @Field(type = FieldType.Keyword)
    private String noticeTypeCd;

    @Field(type = FieldType.Keyword)
    private Long createUserId;

    @Field(type = FieldType.Keyword)
    private String createUserEmail;

    @Field(type = FieldType.Keyword)
    private String createUserProfileImgUrl;

    @Field(type = FieldType.Text)
    private String createUserName;

    @Field(type = FieldType.Keyword)
    private String channelId;

    @Field(type = FieldType.Keyword)
    private String channelName;

    @Field(type = FieldType.Keyword)
    private String mmTeamId;

    @Field(type = FieldType.Keyword)
    private String mmTeamName;

}
