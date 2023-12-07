package togedog.server.global.exception.businessexception.commentexception;

import org.springframework.http.HttpStatus;

public class CommentNotFoundException extends CommentException{

    public static final String MESSAGE = "없거나, 찾을 수 없는 대댓글 입니다.";
    public static final String CODE = "COMMENT-404";

    public CommentNotFoundException() {
        super(MESSAGE, HttpStatus.NOT_FOUND, CODE);

    }
}
