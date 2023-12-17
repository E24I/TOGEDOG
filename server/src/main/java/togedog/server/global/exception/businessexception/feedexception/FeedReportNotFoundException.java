package togedog.server.global.exception.businessexception.feedexception;

import org.springframework.http.HttpStatus;

public class FeedReportNotFoundException extends FeedException {

    public static final String MESSAGE = "신고 내역을 찾을 수 없습니다.";
    public static final String CODE = "FEED_REPORT-404";



    public FeedReportNotFoundException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }


}


