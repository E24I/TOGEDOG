package togedog.server.global.exception.businessexception.memberexception;

import org.springframework.http.HttpStatus;

public class MemberNotFoundException extends MemberException {

    public static final String MESSAGE = "없거나, 찾을 수 없는 회원 입니다.";
    public static final String CODE = "MEMBER-404";



    public MemberNotFoundException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}



