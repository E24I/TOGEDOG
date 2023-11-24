package togedog.server.global.exception.businessexception.chatexception;

import org.springframework.http.HttpStatus;

public class ChatNotFoundException extends ChatException {

    private static final String MESSAGE = "없거나, 찾을 수 없는 채팅방 입니다.";

    public static final String CODE = "CHAT-404";

    public ChatNotFoundException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}
