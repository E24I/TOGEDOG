package togedog.server.domain.comment.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import togedog.server.domain.commentreport.service.dto.request.CommentReportApiToService;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentReportApiRequest {

    @NotNull(message = "신고 내역을 입력해주세요.")
    private String content;


    public CommentReportApiToService commentReportApiToService() {
        return CommentReportApiToService.builder()
                .content(content)
                .build();

    }
}
