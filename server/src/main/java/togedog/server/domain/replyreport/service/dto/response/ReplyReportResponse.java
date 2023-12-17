package togedog.server.domain.replyreport.service.dto.response;

import lombok.*;
import togedog.server.domain.replyreport.entity.ReplyReport;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReplyReportResponse {

    private Long replyId;
    private Long replyReportId;
    private Long reportOwnerId;
    private Long replyOwnerId;
    private String content;
    private LocalDateTime createDate;

    public static ReplyReportResponse replyReportSingleResponse(ReplyReport replyReport) {
        return ReplyReportResponse.builder()
                .content(replyReport.getContent())
                .reportOwnerId(replyReport.getMember().getMemberId())
                .replyId(replyReport.getReply().getReplyId())
                .replyReportId(replyReport.getReplyReportId())
                .replyOwnerId(replyReport.getReply().getMember().getMemberId())
                .createDate(replyReport.getCreatedDateTime())
                .build();
    }

}
