package togedog.server.global.exception.businessexception.commentexception;

import org.springframework.http.HttpStatus;

public class CommentAlreadyDeleteException extends CommentException {

    public static final String MESSAGE = "이미 삭제된 댓글입니다.";
    public static final String CODE = "COMMENT-404";

    public CommentAlreadyDeleteException() {
        super(MESSAGE, HttpStatus.NOT_FOUND, CODE);
    }
}
