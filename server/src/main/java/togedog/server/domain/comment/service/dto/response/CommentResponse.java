package togedog.server.domain.comment.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import togedog.server.domain.comment.entity.Comment;
import togedog.server.domain.member.mapper.MemberInfo;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class CommentResponse {

    private Long commentId;
    private MemberInfo member;
    private LocalDateTime createDate;
    private LocalDateTime updateDate;
    private String content;


    public static CommentResponse commentSingleResponse(Comment comment) {
        return CommentResponse.builder()
                .commentId(comment.getCommentId())
                .member(comment.getMember() != null ? MemberInfo.of(comment.getMember()) : null)
                .createDate(comment.getCreatedDateTime())
                .updateDate(comment.getModifiedDateTime())
                .content(comment.getContent())
                .build();
    }
}
