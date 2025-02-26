package com.jetty.ssafficebe.search.converter;

import com.jetty.ssafficebe.notice.entity.Notice;
import com.jetty.ssafficebe.notice.payload.NoticeSummary;
import com.jetty.ssafficebe.search.document.ESNotice;
import com.jetty.ssafficebe.search.payload.ESNoticeRequest;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE, unmappedTargetPolicy = ReportingPolicy.WARN)
public interface ESNoticeConverter {

    ESNotice toESNotice(ESNoticeRequest request);

    @Mapping(source = "createdBy", target = "createUserId")
    @Mapping(source = "createUser.email", target = "createUserEmail")
    @Mapping(source = "createUser.profileImgUrl", target = "createUserProfileImgUrl")
    @Mapping(source = "createUser.name", target = "createUserName")
    @Mapping(source = "channel.channelId", target = "channelId")
    @Mapping(source = "channel.channelName", target = "channelName")
    @Mapping(source = "channel.mmTeamId", target = "mmTeamId")
    @Mapping(source = "channel.mmTeam.mmTeamName", target = "mmTeamName")
    ESNotice toESNotice(Notice notice);

    @Mapping(source = "createUserId", target = "createUser.userId")
    @Mapping(source = "createUserEmail", target = "createUser.email")
    @Mapping(source = "createUserProfileImgUrl", target = "createUser.profileImgUrl")
    @Mapping(source = "createUserName", target = "createUser.name")
    @Mapping(source = "channelId", target = "channelSummary.channelId")
    @Mapping(source = "channelName", target = "channelSummary.channelName")
    @Mapping(source = "mmTeamId", target = "channelSummary.mmTeamId")
    @Mapping(source = "mmTeamName", target = "channelSummary.mmTeamName")
    NoticeSummary toNoticeSummary(ESNotice esNotice);
}
