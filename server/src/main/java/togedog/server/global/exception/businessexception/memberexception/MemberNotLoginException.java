package togedog.server.global.exception.businessexception.memberexception;

import org.springframework.http.HttpStatus;

public class MemberNotLoginException extends MemberException{

    public static final String MESSAGE = "로그인을 정보를 확인할 수 없습니다.";
    public static final String CODE = "MEMBER-401";



    public MemberNotLoginException() {
        super(CODE, HttpStatus.UNAUTHORIZED, MESSAGE);
    }
}
