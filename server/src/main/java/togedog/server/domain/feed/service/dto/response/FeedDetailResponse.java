package togedog.server.domain.feed.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feedimage.entity.FeedImage;
import togedog.server.domain.member.mapper.MemberInfo;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.domain.reply.service.dto.response.ReplyResponse;
import togedog.server.global.response.PageInformation;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
public class FeedDetailResponse {

    private Long feedId;
    private MemberInfo member;
    private String content;
    private String title;
    private List<String> images;
    private String videos;
    private Integer views; //삭제 요망
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private Integer likeCount;
    private boolean bookmarkYn;
    private boolean likeYn;
    private Boolean replyFix;
    private String address;
    private Integer repliesCount;
    private FeedReplies replies;

    @Getter
    @AllArgsConstructor
    @Builder
    public static class FeedReplies {

        private List<ReplyResponse> replies;
        private PageInformation pageInformation;}


        public static FeedDetailResponse feedDetailResponse(Feed feed, boolean isBookmarkedByCurrentUser, boolean isLikedByCurrentUser, FeedReplies replies ) {

            List<String> feedImagesUrls = feed.getFeedImages().stream()
                    .map(FeedImage::getFeedImageUrl)
                    .collect(Collectors.toList());

            return FeedDetailResponse.builder()
                    .feedId(feed.getFeedId())
                    .title(feed.getTitle())
                    .content(feed.getContent())
                    .createdDate(feed.getCreatedDateTime())
                    .updatedDate(feed.getModifiedDateTime())
                    .address(feed.getAddress())
                    .images(feedImagesUrls)
//                    .images(feed.getFeedImages())
                    .videos(feed.getVideos())
                    .likeCount(feed.getLikeCount())
                    .bookmarkYn(isBookmarkedByCurrentUser)
                    .likeYn(isLikedByCurrentUser)
                    .replyFix(feed.getReplyFix())
                    .member(MemberInfo.of(feed.getMember()))
                    .repliesCount(feed.getRepliesCount())
                    .replies(replies)
                    .build();
        }

    }

