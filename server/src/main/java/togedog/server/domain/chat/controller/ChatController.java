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
@RequestMapping("/chat")
@CrossOrigin(allowedHeaders = "*", origins = "*")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    private final LoginMemberUtil loginMemberUtil;

    //채팅방 생성
    @PostMapping
    public ResponseEntity<String> postChatRoom(@RequestBody ChatPostRequest chatPostRequest) {

        Long chatRoomId = chatService.createChatRoom(chatPostRequest);

        return new ResponseEntity<>("chatRoomId: " + chatRoomId, HttpStatus.CREATED);
    }

    //채팅방 목록 조회
    @GetMapping
    public ResponseEntity<List<ChatRoomResponse>> getChatRooms(@RequestParam("member-id") Long memberId) {

//        Long memberId = loginMemberUtil.getLoginMemberId();

        List<ChatRoomResponse> responses = chatService.findChatRooms(memberId);

        return new ResponseEntity<>(responses, HttpStatus.OK);
    }

    //채팅방 조회
    @GetMapping("/{chatroom-id}")
    public ResponseEntity<ChatRoomResponse> getChatRoom(@PathVariable("chatroom-id") Long chatRoomId, @RequestBody ChatGetRequest chatGetRequest) {

        ChatRoomResponse response = chatService.findChatRoom(chatGetRequest.getMemberId(), chatRoomId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
