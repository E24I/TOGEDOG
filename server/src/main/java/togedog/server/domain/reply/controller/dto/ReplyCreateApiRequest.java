package togedog.server.domain.reply.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.domain.reply.service.dto.request.ReplyServiceCreateApiRequest;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@AllArgsConstructor
@Getter
@Builder
@NoArgsConstructor
public class ReplyCreateApiRequest {

    @NotBlank(message = "댓글의 내용을 입력해주세요.")
    private String content;



    public ReplyServiceCreateApiRequest toCreateServiceApiRequest() {
        return ReplyServiceCreateApiRequest.builder()
                .content(content)
                .build();

    }
}
