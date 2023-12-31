package togedog.server.global.exception.businessexception.memberexception;

import org.springframework.http.HttpStatus;

public class MemberEmailExistException extends MemberException{

    public static final String MESSAGE = "존재하는 이메일 입니다.";
    public static final String CODE = "MEMBER-404";

    public MemberEmailExistException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}
