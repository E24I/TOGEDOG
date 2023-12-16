package togedog.server.global.exception.businessexception.memberexception;

import org.springframework.http.HttpStatus;

public class MemberRolesNotMatchException extends MemberException{

    public static final String MESSAGE = "관리자 권한이 필요한 기능입니다.";
    public static final String CODE = "MEMBER-401";

    public MemberRolesNotMatchException() {
        super(CODE, HttpStatus.UNAUTHORIZED, MESSAGE);
    }
}
