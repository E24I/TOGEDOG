package togedog.server.global.exception.businessexception.replyexception;

import org.springframework.http.HttpStatus;

public class ReplyReportNotFoundException extends ReplyException {
    public static final String MESSAGE = "신고 내역을 찾을 수 없습니다.";
    public static final String CODE = "REPLY_REPORT-404";



    public ReplyReportNotFoundException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }

}
