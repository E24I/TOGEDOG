package togedog.server.domain.feed.service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeedUpdateServiceRequest {


    private String title;
    private String content;
    private Boolean openYn;
}
