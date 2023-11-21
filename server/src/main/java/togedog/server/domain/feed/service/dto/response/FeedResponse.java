package togedog.server.domain.feed.service.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.member.mapper.MemberInfo;

import java.time.LocalDateTime;

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
    private Integer views;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private Integer likeCount;
    private Boolean bookmarkYn;
    private String address;
    private Integer repliesCount;

    public static FeedResponse createFeedResponse(Feed feed) {

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
                .build();

    }
}
