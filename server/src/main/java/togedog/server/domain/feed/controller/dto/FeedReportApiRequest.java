package togedog.server.domain.feed.controller.dto;

import lombok.*;
import togedog.server.domain.feed.service.dto.request.FeedReportApiToService;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FeedReportApiRequest {

    private String content;


    public FeedReportApiToService feedReportApiToService() {
        return FeedReportApiToService.builder()
                .content(content)
                .build();
    }
}
