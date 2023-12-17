package togedog.server.global.exception.businessexception.dbexception;

import org.springframework.http.HttpStatus;
import togedog.server.global.exception.businessexception.BusinessException;

public class DbException extends BusinessException {

    public static final String MESSAGE = "데이터베이스 오류입니다.";
    public static final String CODE = "DATABASE-500";

    public DbException() {
        super(CODE, HttpStatus.INTERNAL_SERVER_ERROR, MESSAGE);
    }
}
