package togedog.server.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class ChatPostRequest {

    private Long memberId;
}
