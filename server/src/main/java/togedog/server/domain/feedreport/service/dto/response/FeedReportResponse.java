package togedog.server.domain.feedreport.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.domain.feedreport.entity.FeedReport;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedReportResponse {

    private Long feedReportId;
    private Long feedId;
    private Long reportOwnerId;
    private Long feedOwnerId;
    private String content;
    private LocalDateTime createDate;


    public static FeedReportResponse feedReportSingleResponse(FeedReport feedReport) {
        return FeedReportResponse.builder()
                .feedReportId(feedReport.getFeedReportId())
                .content(feedReport.getContent())
                .reportOwnerId(feedReport.getMember().getMemberId())
                .feedOwnerId(feedReport.getFeed().getMember().getMemberId())
                .feedId(feedReport.getFeed().getFeedId())
                .createDate(feedReport.getCreatedDateTime())
                .build();
    }

}
