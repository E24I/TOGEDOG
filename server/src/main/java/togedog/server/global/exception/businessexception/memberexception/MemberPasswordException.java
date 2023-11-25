package togedog.server.global.exception.businessexception.memberexception;

import org.springframework.http.HttpStatus;

public class MemberPasswordException extends MemberException{
    public static final String MESSAGE = "패스워드가 다릅니다.";
    public static final String CODE = "MEMBER-404";


    public MemberPasswordException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}
