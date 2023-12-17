package togedog.server.domain.feed.service.dto.request;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class FeedReportApiToService {

    private String content;
}
