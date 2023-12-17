package togedog.server.domain.feed.controller.dto;

import lombok.*;
import togedog.server.domain.feed.service.dto.request.FeedReportApiToService;

import javax.validation.constraints.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedReportApiRequest {

    @NotNull(message = "신고 내역을 입력해주세요.")
    private String content;


    public FeedReportApiToService feedReportApiToService() {
        return FeedReportApiToService.builder()
                .content(content)
                .build();
    }
}
