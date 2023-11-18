package togedog.server.domain.chat.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import togedog.server.domain.chat.dto.ChatPostRequest;

@RestController
public class ChatController {

    //채팅방 생성
    @PostMapping("/chat")
    public ResponseEntity postChatRoom(@RequestBody ChatPostRequest chatPostRequest) {

        //토큰 검증 매서드로 요청보낸 사용자의 memberId 획득
        //TODO: 11월 15일(수) 작성예정


        return new ResponseEntity<>("chatRoomId: 추가예정", HttpStatus.CREATED);
    }
}
