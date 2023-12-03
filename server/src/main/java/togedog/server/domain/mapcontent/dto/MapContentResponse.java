package togedog.server.domain.mapcontent.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MapContentResponse {

    private String wgs84_x;

    private String wgs84_y;
}
