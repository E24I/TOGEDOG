package togedog.server.global.exception.businessexception.requestexception;

import org.springframework.http.HttpStatus;

public class RequestContentTypeException extends RequestException{

    public static final String MESSAGE = "요청 미디어의 타입이 잘못되었습니다.";
    public static final String CODE = "REQUEST-400";

    public RequestContentTypeException() {
        super(CODE, HttpStatus.BAD_REQUEST, MESSAGE);
    }

    public RequestContentTypeException(String failedValue) {
        super(CODE, HttpStatus.BAD_REQUEST, MESSAGE + " 잘못된 미디어 타입 : " + failedValue);
    }
}
