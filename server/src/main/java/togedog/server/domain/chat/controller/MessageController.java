package togedog.server.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import togedog.server.domain.chat.dto.MessageRequest;

@RestController
@RequiredArgsConstructor
public class MessageController {

    @MessageMapping("/chat/{room-id}")
    @SendTo("/sub/chat/{room-id}")
    public ResponseEntity sendMessage(@DestinationVariable("room-id") Long roomId, @RequestBody MessageRequest messageRequest) {
        //TODO: 11월 15일(수) 작성예정

        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
