package togedog.server.domain.comment.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.domain.comment.service.dto.request.CommentUpdateServiceRequest;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CommentUpdateApiRequest {

    @NotBlank(message = "댓글의 내용을 입력해주세요.")
    private String content;


    public CommentUpdateServiceRequest ToCommentUpdateService() {
        return CommentUpdateServiceRequest.builder()
                .content(content)
                .build();
    }

}
