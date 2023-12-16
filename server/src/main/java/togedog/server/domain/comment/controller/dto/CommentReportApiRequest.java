package togedog.server.domain.comment.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import togedog.server.domain.commentreport.service.dto.request.CommentReportApiToService;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentReportApiRequest {

    private String content;


    public CommentReportApiToService commentReportApiToService() {
        return CommentReportApiToService.builder()
                .content(content)
                .build();

    }
}
