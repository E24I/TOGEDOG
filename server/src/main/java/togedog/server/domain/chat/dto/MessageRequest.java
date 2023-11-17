package togedog.server.domain.chat.dto;

import lombok.Getter;

@Getter
public class MessageRequest {

    private String content;

    private Long memberId;
}
