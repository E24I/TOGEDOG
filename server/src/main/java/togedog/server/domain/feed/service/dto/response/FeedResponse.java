package togedog.server.domain.feed.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.member.mapper.MemberInfo;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.global.response.PageInformation;
import togedog.server.domain.feedimage.entity.FeedImage;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@AllArgsConstructor
public class FeedResponse {

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

        List<String> feedImagesUrls = feed.getFeedImages().stream()
                .map(FeedImage::getFeedImageUrl)
                .collect(Collectors.toList());

        return FeedResponse.builder()
                .feedId(feed.getFeedId())
                .title(feed.getTitle())
                .content(feed.getContent())
                .member(MemberInfo.of(feed.getMember()))
                .images(feedImagesUrls)
                .videos(feed.getVideos())
                .updatedDate(feed.getModifiedDateTime())
                .createdDate(feed.getCreatedDateTime())
                .likeCount(feed.getLikeCount())
                .repliesCount(feed.getReplies().size())
//                .repliesCount(feed.getRepliesCount())
                .address(feed.getAddress())
                .bookmarkYn(isBookmarkedByCurrentUser)
                .likeYn(isLikedByCurrentUser)
                .build();

    }

//    public static FeedResponse feedWithRepliesResponse(Feed feed, boolean isBookmarkedByCurrentUser, boolean isLikedByCurrentUser, List<ReplyResponse> replies, PageInformation pageInformation) {
//        FeedReplies feedReplies = FeedReplies.builder()
//                .replies(replies)
//                .pageInformation(pageInformation)
//                .build();
//
//        List<String> feedImagesUrls = feed.getFeedImages().stream()
//                .map(FeedImage::getFeedImageUrl)
//                .collect(Collectors.toList());
//
//        return FeedResponse.builder()
//                .feedId(feed.getFeedId())
//                .title(feed.getTitle())
//                .content(feed.getContent())
//                .member(MemberInfo.of(feed.getMember()))
//                .images(feedImagesUrls)
//                .videos(feed.getVideos())
//                .updatedDate(feed.getModifiedDateTime())
//                .createdDate(feed.getCreatedDateTime())
//                .likeCount(feed.getLikeCount())
//                .repliesCount(feed.getRepliesCount())
//                .address(feed.getAddress())
//                .bookmarkYn(isBookmarkedByCurrentUser)
//                .likeYn(isLikedByCurrentUser)
//                .feedReplies(feedReplies)
//                .build();
//    }



}
