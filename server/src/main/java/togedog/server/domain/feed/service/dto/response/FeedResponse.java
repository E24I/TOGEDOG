package togedog.server.domain.feed.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.member.mapper.MemberInfo;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.global.response.PageInformation;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class FeedResponse {

    private Long feedId;
    private MemberInfo member;
    private String content;
    private String title;
//    private List<image>
    private String images;
    private String videos;
    private Integer views; //삭제 요망
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private Integer likeCount;
    private boolean bookmarkYn;
    private boolean likeYn;
    private String address;
    private Integer repliesCount;

    @Getter
    @AllArgsConstructor
    @Builder

    public static class FeedReplies {

        private List<Reply> replies;
        private PageInformation pageInformation;
    }


    public static FeedResponse singleFeedResponse(Feed feed, boolean isBookmarkedByCurrentUser, boolean isLikedByCurrentUser) {

        return FeedResponse.builder()
                .feedId(feed.getFeedId())
                .title(feed.getTitle())
                .content(feed.getContent())
                .member(MemberInfo.of(feed.getMember()))
                .updatedDate(feed.getModifiedDateTime())
                .createdDate(feed.getCreatedDateTime())
                .likeCount(feed.getLikeCount())
                .repliesCount(feed.getRepliesCount())
                .address(feed.getAddress())
                .bookmarkYn(isBookmarkedByCurrentUser)
                .likeYn(isLikedByCurrentUser)
                .build();

    }


//    public static FeedResponse feedDetailResponse() {
//
//
//    }


}
