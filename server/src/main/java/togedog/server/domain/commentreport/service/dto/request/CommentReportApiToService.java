package togedog.server.domain.commentreport.service.dto.request;

import lombok.*;

@Builder
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentReportApiToService {

    private String content;
}
