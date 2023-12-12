package togedog.server.global.exception.businessexception.petexception;

import org.springframework.http.HttpStatus;
import togedog.server.global.exception.businessexception.BusinessException;

public abstract class PetException extends BusinessException {
    protected PetException(String errorCode, HttpStatus httpStatus, String message) {
        super(errorCode, httpStatus, message);
    }
}
