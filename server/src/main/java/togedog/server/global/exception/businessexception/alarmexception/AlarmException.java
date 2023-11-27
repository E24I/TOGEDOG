package togedog.server.global.exception.businessexception.alarmexception;

import org.springframework.http.HttpStatus;
import togedog.server.global.exception.businessexception.BusinessException;

public abstract class AlarmException extends BusinessException {

    protected AlarmException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }
}
