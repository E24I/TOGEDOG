package togedog.server.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import togedog.server.domain.chat.dto.ChatPostRequest;
import togedog.server.domain.chat.service.ChatService;
import togedog.server.domain.member.service.MemberService;

@RestController
@RequiredArgsConstructor
public class ChatController {

    private final MemberService memberService;

    private final ChatService chatService;

    //채팅방 생성
    @PostMapping("/chat")
    public ResponseEntity postChatRoom(@RequestBody ChatPostRequest chatPostRequest) {

        //TODO: 토큰 검증 매서드로 요청보낸 사용자의 memberId 획득하는 로직으로 변경예정

        chatService.createChatRoom(chatPostRequest);

        return new ResponseEntity<>("chatRoomId: 추가예정", HttpStatus.CREATED);
    }
}
