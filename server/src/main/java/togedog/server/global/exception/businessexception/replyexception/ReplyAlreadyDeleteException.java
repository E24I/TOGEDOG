package togedog.server.global.exception.businessexception.replyexception;

import org.springframework.http.HttpStatus;

public class ReplyAlreadyDeleteException extends ReplyException{

    public static final String MESSAGE = "이미 삭제된 댓글입니다.";
    public static final String CODE = "reply-404";



    public ReplyAlreadyDeleteException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }


}

