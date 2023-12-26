package togedog.server.global.exception.businessexception.mapcontentexception;

import org.springframework.http.HttpStatus;

public class MapContentNotFoundException extends MapContentException {

    private static final String MESSAGE = "없거나, 찾을 수 없는 좌표 입니다.";

    public static final String CODE = "MAP-404";

    public MapContentNotFoundException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}
