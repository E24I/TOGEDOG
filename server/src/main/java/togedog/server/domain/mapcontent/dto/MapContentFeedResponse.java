package togedog.server.domain.mapcontent.dto;

import lombok.Getter;
import togedog.server.domain.feed.service.dto.response.FeedResponse;

import java.util.ArrayList;
import java.util.List;

@Getter
public class MapContentFeedResponse {

    private final List<FeedResponse> feedResponses = new ArrayList<>();
}
