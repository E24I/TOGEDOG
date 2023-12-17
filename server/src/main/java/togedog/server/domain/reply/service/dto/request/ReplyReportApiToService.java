package togedog.server.domain.reply.service.dto.request;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReplyReportApiToService {

    private String content;
}
