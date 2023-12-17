package togedog.server.domain.reply.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import togedog.server.domain.reply.service.dto.request.ReplyReportApiToService;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReplyReportApiRequest {

    @NotNull(message = "신고 내역을 입력해주세요.")
    private String content;


    public ReplyReportApiToService replyReportApiToService() {
        return ReplyReportApiToService.builder()
                .content(content)
                .build();
    }
}
