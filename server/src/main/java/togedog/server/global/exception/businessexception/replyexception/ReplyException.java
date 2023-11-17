package togedog.server.global.exception.businessexception.replyexception;

import org.springframework.http.HttpStatus;
import togedog.server.global.exception.businessexception.BusinessException;

public abstract class ReplyException extends BusinessException {

    protected ReplyException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }
}
