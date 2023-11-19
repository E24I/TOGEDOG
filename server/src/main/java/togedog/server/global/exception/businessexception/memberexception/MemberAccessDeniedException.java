package togedog.server.global.exception.businessexception.memberexception;

import org.springframework.http.HttpStatus;

import java.util.Stack;

public class MemberAccessDeniedException extends MemberException{

    public static final String MESSAGE = "다른 사람의 정보에 접근할 수 없습니다.";
    public static final String CODE = "MEMBER-403";

    public MemberAccessDeniedException() {
        super(CODE, HttpStatus.FORBIDDEN, MESSAGE);
    }



}
