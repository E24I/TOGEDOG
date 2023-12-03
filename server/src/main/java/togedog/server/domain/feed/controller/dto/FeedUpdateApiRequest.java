package togedog.server.domain.feed.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.domain.feed.service.dto.request.FeedUpdateServiceRequest;

@AllArgsConstructor
@Getter
@Builder
@NoArgsConstructor
public class FeedUpdateApiRequest {

    private String title;
    private String content;
    private Boolean openYn;


    public FeedUpdateServiceRequest toFeedUpdateServiceRequest() {
        return FeedUpdateServiceRequest.builder()
                .title(title)
                .content(content)
                .openYn(openYn)
                .build();

    }
}
