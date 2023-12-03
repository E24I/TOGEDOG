package togedog.server.global.exception.businessexception.memberexception;

import org.springframework.http.HttpStatus;

public class MemberNicknameException extends MemberException{

    public static final String MESSAGE = "존재하는 닉네임 입니다.";
    public static final String CODE = "MEMBER-404";


    public MemberNicknameException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}
