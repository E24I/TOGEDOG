package togedog.server.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feedimage.entity.FeedImage;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
public class MemberFeedDto {

    private Long feedId;
    private String content;
    private String title;
    private List<String> images;
    private String videos;
    private Integer views; //삭제 요망
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private Integer likeCount;
    private Integer repliesCount;

    public static MemberFeedDto of(Feed feed){

        List<String> feedImagesUrls = feed.getFeedImages().stream()
                .map(FeedImage::getFeedImageUrl)
                .collect(Collectors.toList());

        return MemberFeedDto.builder()
                .feedId(feed.getFeedId())
                .content(feed.getContent())
                .title(feed.getTitle())
                .images(feedImagesUrls)
                .videos(feed.getVideos())
                .views(feed.getViews())
                .createdDate(feed.getCreatedDateTime())
                .updatedDate(feed.getModifiedDateTime())
                .likeCount(feed.getLikeCount())
                .repliesCount(feed.getRepliesCount())
                .build();
    }
}
