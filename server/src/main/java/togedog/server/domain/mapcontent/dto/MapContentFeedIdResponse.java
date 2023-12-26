package togedog.server.domain.mapcontent.dto;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class MapContentFeedIdResponse {

    private final List<Long> feedIdList = new ArrayList<>();
}
