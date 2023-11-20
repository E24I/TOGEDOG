package togedog.server.global.exception.businessexception.feedexception;

import org.springframework.http.HttpStatus;

public class FeedNotFoundException extends FeedException{

    public static final String MESSAGE = "없거나, 찾을 수 없는 피드 입니다.";
    public static final String CODE = "FEED-404";

    public FeedNotFoundException() {
        super(MESSAGE, HttpStatus.NOT_FOUND, CODE);

    }
}
