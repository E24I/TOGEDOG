package togedog.server.global.exception.businessexception.commentexception;

import org.springframework.http.HttpStatus;

public class CommentReportNotFoundException extends CommentException{

    public static final String MESSAGE = "신고 내역을 찾을 수 없습니다.";
    public static final String CODE = "COMMENT_REPORT-404";

    public CommentReportNotFoundException() {
        super(MESSAGE, HttpStatus.NOT_FOUND, CODE);

    }
}
