package com.jetty.ssafficebe.remind.converter;

import com.jetty.ssafficebe.remind.entity.Remind;
import com.jetty.ssafficebe.remind.payload.RemindRequest;
import com.jetty.ssafficebe.remind.payload.RemindSummary;
import java.time.LocalDateTime;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring", unmappedSourcePolicy = ReportingPolicy.IGNORE, unmappedTargetPolicy = ReportingPolicy.WARN)
public interface RemindConverter {

    RemindRequest toRemindRequest(String essentialYn, String remindTypeCd, LocalDateTime remindDateTime);

    Remind toRemind(RemindRequest remindRequest);

    RemindSummary toRemindSummary(Remind remind);

    List<RemindSummary> toRemindDetails(List<Remind> reminds);
}