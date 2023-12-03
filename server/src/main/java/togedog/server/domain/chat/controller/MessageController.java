package togedog.server.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.chat.dto.MessagePageResponse;
import togedog.server.domain.chat.dto.MessageRequest;
import togedog.server.domain.chat.service.MessageService;

import java.util.List;

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
    public ResponseEntity<String> sendMessage(@DestinationVariable("room-id") Long roomId, @RequestBody MessageRequest messageRequest) {

        Long messageId = messageService.createMessage(roomId, messageRequest);

        return new ResponseEntity<>("messageId: " + messageId, HttpStatus.CREATED);
    }

    @GetMapping("/chat/{room-id}/message")
    public ResponseEntity<MessagePageResponse> getMessages(@PathVariable("room-id") Long chatRoomId,
                                                             @RequestParam(name = "page_number") int pageNumber,
                                                             @RequestParam(name = "page_size") int pageSize) {

        MessagePageResponse response = messageService.findMessages(chatRoomId, pageNumber, pageSize);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}