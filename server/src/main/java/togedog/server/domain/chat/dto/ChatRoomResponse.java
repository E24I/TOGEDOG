package togedog.server.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomResponse {

    private Long chatRoomId;

    private Long otherMemberId;

    private String latestMessage;

    private String createdAt;
}
