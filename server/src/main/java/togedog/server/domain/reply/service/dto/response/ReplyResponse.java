package togedog.server.domain.reply.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import togedog.server.domain.member.mapper.MemberInfo;
import togedog.server.domain.reply.entity.Reply;

import java.time.LocalDateTime;

@Getter
@Builder
@AllArgsConstructor
public class ReplyResponse {

    private Long replyId;
    private String content;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private MemberInfo member;
    private Integer likeCount;
    private Boolean likeYn;
    private Integer commentCount;
    private Boolean fix;


    public static ReplyResponse singReplyResponse(Reply reply,boolean isLikedByCurrentUser) {

        return ReplyResponse.builder()
                .replyId(reply.getReplyId())
                .content(reply.getContent())
                .createdDate(reply.getCreatedDateTime())
                .updatedDate(reply.getModifiedDateTime())
                .member(MemberInfo.of(reply.getMember()))
                .likeCount(reply.getLikeCount())
                .likeYn(isLikedByCurrentUser) // 이 부분 수정
                .commentCount(reply.getCommentCount())
                .fix(reply.getFix())
                .build();

    }

}
