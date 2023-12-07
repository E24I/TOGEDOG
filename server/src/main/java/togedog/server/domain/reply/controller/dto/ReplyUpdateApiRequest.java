package togedog.server.domain.reply.controller.dto;

import lombok.*;
import togedog.server.domain.reply.service.dto.request.ReplyServiceUpdateApiRequest;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReplyUpdateApiRequest {

    private String content;


    public ReplyServiceUpdateApiRequest toServiceRequest() {
        return ReplyServiceUpdateApiRequest.builder()
                .content(content)
                .build();
    }


}
