package togedog.server.domain.mapcontent.dto;

import lombok.Getter;

@Getter
public class MapContentRequest {

    private Long feedId;

    private String utm_k_x;

    private String utm_k_y;
}
