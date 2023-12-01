package togedog.server.domain.chat.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.chat.dto.ChatGetRequest;
import togedog.server.domain.chat.dto.ChatPostRequest;
import togedog.server.domain.chat.dto.ChatRoomResponse;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.chat.service.ChatService;
import togedog.server.domain.member.service.MemberService;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.dto.SingleResponseDto;

import java.util.List;

@RestController
@CrossOrigin(allowedHeaders = "*", origins = "*")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    private final LoginMemberUtil loginMemberUtil;

    //채팅방 생성
    @PostMapping("/chat")
    public ResponseEntity<String> postChatRoom(@RequestBody ChatPostRequest chatPostRequest) {

        chatService.createChatRoom(chatPostRequest);

        return new ResponseEntity<>("chatRoomId: 추가예정", HttpStatus.CREATED);
    }

    @GetMapping("/chat")
    public ResponseEntity<List<ChatRoomResponse>> getChatRooms(@RequestBody ChatGetRequest chatGetRequest) {

//        Long memberId = loginMemberUtil.getLoginMemberId();
        Long memberId = chatGetRequest.getMemberId();

        List<ChatRoomResponse> responses = chatService.findChatRooms(memberId);

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }
}
