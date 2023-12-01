package togedog.server.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatRoomResponse {

    private Long chatRoom_id;

    //private Long other_member_id;

    private Long participant_member_1;

    private Long participant_member_2;

    private String latest_message;

    private String created_at;
}
