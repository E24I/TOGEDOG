package togedog.server.global.exception.businessexception.mapcontentexception;

import org.springframework.http.HttpStatus;
import togedog.server.global.exception.businessexception.BusinessException;

public abstract class MapContentException extends BusinessException {
    protected MapContentException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }
}
