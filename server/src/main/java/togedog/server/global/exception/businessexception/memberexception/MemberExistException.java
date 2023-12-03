package togedog.server.global.exception.businessexception.memberexception;

import org.springframework.http.HttpStatus;

public class MemberExistException extends MemberException{

    public static final String MESSAGE = "존재하는 사용자입니다.";
    public static final String CODE = "MEMBER-404";


    public MemberExistException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}
