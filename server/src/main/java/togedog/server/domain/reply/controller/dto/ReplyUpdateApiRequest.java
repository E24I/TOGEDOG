package togedog.server.domain.reply.controller.dto;

import lombok.*;
import togedog.server.domain.reply.service.dto.request.ReplyServiceUpdateApiRequest;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReplyUpdateApiRequest {

    @NotBlank(message = "댓글의 내용을 입력해주세요.")
    private String content;


    public ReplyServiceUpdateApiRequest toServiceRequest() {
        return ReplyServiceUpdateApiRequest.builder()
                .content(content)
                .build();
    }


}
