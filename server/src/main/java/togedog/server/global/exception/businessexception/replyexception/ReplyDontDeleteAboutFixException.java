package togedog.server.global.exception.businessexception.replyexception;

import org.springframework.http.HttpStatus;

public class ReplyDontDeleteAboutFixException extends ReplyException{

    public static final String MESSAGE = "고정되어 있는 댓글은 삭제할 수 없습니다.";
    public static final String CODE = "reply-403";


    public ReplyDontDeleteAboutFixException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }

}
