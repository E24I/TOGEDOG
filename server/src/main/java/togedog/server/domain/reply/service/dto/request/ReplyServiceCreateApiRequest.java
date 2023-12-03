package togedog.server.domain.reply.service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@AllArgsConstructor
@Getter
@Builder
public class ReplyServiceCreateApiRequest {

    private String content;


}
