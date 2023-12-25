package togedog.server.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageResponse {

    private Long messageId;

    private Long memberId;

    private String content;

    private String createAt;
}
