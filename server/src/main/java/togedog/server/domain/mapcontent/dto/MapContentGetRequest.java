package togedog.server.domain.mapcontent.dto;

import lombok.Getter;

@Getter
public class MapContentGetRequest {

    private String wgs84_x;

    private String wgs84_y;
}
