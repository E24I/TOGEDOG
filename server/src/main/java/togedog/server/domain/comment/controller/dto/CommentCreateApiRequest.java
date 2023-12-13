package togedog.server.domain.comment.controller.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.domain.comment.service.dto.request.CommentCreateServiceRequest;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CommentCreateApiRequest {

    @NotBlank(message = "댓글의 내용을 입력해주세요.")
    private String content;

    public CommentCreateServiceRequest toServiceRequest() {
        return CommentCreateServiceRequest.builder()
                .content(content)
                .build();
    }
}
