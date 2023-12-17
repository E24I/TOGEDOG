package togedog.server.global.exception.businessexception.memberexception;

import org.springframework.http.HttpStatus;

public class MemberPasswordSameException extends MemberException{
    public static final String MESSAGE = "기존 패스워드와 다르게 설정해주세요.";
    public static final String CODE = "MEMBER-404";


    public MemberPasswordSameException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}
