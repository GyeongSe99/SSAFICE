package com.jetty.ssafficebe.search.converter;

import com.jetty.ssafficebe.search.document.ESUser;
import com.jetty.ssafficebe.search.payload.ESUserRequest;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE, unmappedTargetPolicy = ReportingPolicy.WARN)
public interface ESUserConverter {

    ESUser toESUser(ESUserRequest request);
}
