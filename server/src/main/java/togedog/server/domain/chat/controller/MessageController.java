package togedog.server.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import togedog.server.domain.chat.dto.MessageRequest;
import togedog.server.domain.chat.service.MessageService;

@RestController
@CrossOrigin(allowedHeaders = "*", origins = "*")
@RequiredArgsConstructor
public class MessageController {

    private final MessageService messageService;

    private final SimpMessageSendingOperations simpMessageSendingOperations;

    //Client(Front) 쪽 코드 예시
    //function sendContent(client) {
    //    // pub prefix를 달고 있고 MessageMapping에 /chat/{room-id}로 되어있는곳에 추가
    //    client.send("/pub/chat/{room-id}", {}, JSON.stringify({'content': $("#content").val()}));
    //}

    @MessageMapping("/chat/{room-id}") // 보낼 때 /pub/chat/{room-id}
    @SendTo("/sub/chat/{room-id}")     // 받을 때 /sub/chat/{room-id}
    public ResponseEntity sendMessage(@DestinationVariable("room-id") Long roomId, @RequestBody MessageRequest messageRequest) {

        Long messageId = messageService.createMessage(roomId, messageRequest);

        return new ResponseEntity<>("messageId: " + messageId, HttpStatus.OK);
    }
}

