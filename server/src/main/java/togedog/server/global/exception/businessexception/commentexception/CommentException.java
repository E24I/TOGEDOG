package togedog.server.global.exception.businessexception.commentexception;

import org.springframework.http.HttpStatus;
import togedog.server.global.exception.businessexception.BusinessException;

public abstract class CommentException extends BusinessException {

    protected CommentException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }
}
