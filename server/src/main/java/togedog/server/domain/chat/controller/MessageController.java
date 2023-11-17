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
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.chat.entity.Message;
import togedog.server.domain.chat.mapper.MessageMapper;
import togedog.server.domain.chat.service.ChatService;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.service.MemberService;

@RestController
@RequiredArgsConstructor
public class MessageController {

    private final MemberService memberService;

    private final ChatService chatService;

    private final MessageMapper messageMapper;

    //Client(Front) 쪽 코드 예시
    //function sendContent(client) {
    //    // pub prefix를 달고 있고 MessageMapping에 /chat/{room-id}로 되어있는곳에 추가
    //    client.send("/sub/chat/{room-id}", {}, JSON.stringify({'content': $("#content").val()}));
    //}

    @MessageMapping("/chat/{room-id}")
    @SendTo("/sub/chat/{room-id}")
    public ResponseEntity sendMessage(@DestinationVariable("room-id") Long roomId, @RequestBody MessageRequest messageRequest) {
        //TODO: Member Service에 findMember 메서드 작성 시 주석 해제 예정

        //Member findMember = memberService.findMember(messageRequest.getMemberId());

        ChatRoom findChatRoom = chatService.findChatRoom(roomId);

        //Message message = messageMapper.messageRequestToMessage(messageRequest, findMember, findChatRoom)


        return new ResponseEntity<>(null, HttpStatus.OK);
    }
}
