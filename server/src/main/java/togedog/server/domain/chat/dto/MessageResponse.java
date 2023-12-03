package togedog.server.domain.chat.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MessageResponse {

    private Long messageId;

    private Long memberId;

    private String content;

    private String createAt;
}
