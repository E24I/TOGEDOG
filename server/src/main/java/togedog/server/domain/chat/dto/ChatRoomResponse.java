package togedog.server.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomResponse {

    private Long chatRoom_id;

    private Long other_member_id;

    private String latest_message;

    private String created_at;
}
