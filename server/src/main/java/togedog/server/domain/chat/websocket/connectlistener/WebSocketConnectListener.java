package togedog.server.domain.chat.websocket.connectlistener;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.GenericMessage;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;
import togedog.server.domain.chat.service.ChatService;

import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class WebSocketConnectListener {

    private final ChatService chatService;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent sessionConnectedEvent) {
        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(sessionConnectedEvent.getMessage());
        GenericMessage generic = (GenericMessage) stompHeaderAccessor.getHeader("simpConnectMessage");
        Map nativeHeaders = (Map) generic.getHeaders().get("nativeHeaders");

        if ((nativeHeaders.containsKey("chatRoomId")) && (nativeHeaders.containsKey("memberId"))) {
            Long chatRoomId = Long.parseLong((String) ((List) nativeHeaders.get("chatRoomId")).get(0));
            Long memberId = Long.parseLong((String) ((List) nativeHeaders.get("memberId")).get(0));
            String sessionId = stompHeaderAccessor.getSessionId();
//            chatService.insertChatSession(chatRoomId, memberId, sessionId);

        }

    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor stompHeaderAccessor = StompHeaderAccessor.wrap(event.getMessage());

        String sessionId = stompHeaderAccessor.getSessionId();
//        ChatSession chatSessionBySessionId = chatService.findChatSessionBySessionId(sessionId);
//
//        if (chatSessionBySessionId != null) {
//            chatService.deleteChatSession(sessionId);
//        }
    }
}
