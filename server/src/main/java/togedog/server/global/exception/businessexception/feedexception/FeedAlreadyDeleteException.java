package togedog.server.global.exception.businessexception.feedexception;

import org.springframework.http.HttpStatus;

public class FeedAlreadyDeleteException extends FeedException{

    public static final String MESSAGE = "이미 삭제된 게시글입니다.";
    public static final String CODE = "feed-404";



    public FeedAlreadyDeleteException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }


}

