package togedog.server.global.exception.businessexception.chatexception;

import org.springframework.http.HttpStatus;

public class ChatBadRequestException extends ChatException {

    private static final String MESSAGE = "잘못된 채팅방 생성 요청입니다.";

    public static final String CODE = "CHAT-400";

    public ChatBadRequestException() {
        super(CODE, HttpStatus.BAD_REQUEST, MESSAGE);
    }
}
