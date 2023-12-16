package togedog.server.domain.reply.controller.dto;

import lombok.Getter;
import lombok.Setter;
import togedog.server.domain.reply.service.dto.request.ReplyReportApiToService;
@Getter
@Setter
public class ReplyReportApiRequest {

    private String content;


    public ReplyReportApiToService replyReportApiToService() {
        return ReplyReportApiToService.builder()
                .content(content)
                .build();
    }
}
