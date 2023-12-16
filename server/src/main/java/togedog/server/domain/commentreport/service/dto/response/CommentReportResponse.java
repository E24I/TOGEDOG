package togedog.server.domain.commentreport.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.domain.commentreport.entity.CommentReport;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentReportResponse {

    private Long commentReportId;
    private Long commentId;
    private Long reportOwnerId;
    private Long commentOwnerId;
    private String content;
    private LocalDateTime createDate;

    public static CommentReportResponse commentReportSingleResponse(CommentReport commentReport) {
        return CommentReportResponse.builder()
                .commentReportId(commentReport.getCommentReportId())
                .commentId(commentReport.getComment().getCommentId())
                .reportOwnerId(commentReport.getMember().getMemberId())
                .commentOwnerId(commentReport.getComment().getMember().getMemberId())
                .content(commentReport.getContent())
                .createDate(commentReport.getCreatedDateTime())
                .build();

    }
}
