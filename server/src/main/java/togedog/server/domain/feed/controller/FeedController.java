package togedog.server.domain.feed.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.feed.controller.dto.FeedCreateApiRequest;
import togedog.server.domain.feed.controller.dto.FeedUpdateApiRequest;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.service.FeedService;
import togedog.server.domain.feed.service.dto.response.FeedResponse;
import togedog.server.domain.feedbookmark.service.FeedBookmarkService;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.feedlike.service.FeedLikeService;
import togedog.server.global.response.ApiPageResponse;
import togedog.server.global.response.ApiSingleResponse;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/feed")
@Validated
@RequiredArgsConstructor
public class FeedController {

    private final FeedService feedService;
    private final FeedLikeService feedLikeService;
    private final FeedBookmarkService feedBookmarkService;



    @GetMapping("/")
    public ResponseEntity<ApiPageResponse<FeedResponse>> getFeeds(@RequestParam(defaultValue = "1") int page,
                                                                  @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<FeedResponse> feedsPage = feedService.getFeedsPaged(pageable);

        return ResponseEntity.ok(ApiPageResponse.ok(feedsPage));
    }


    @PostMapping
    public ResponseEntity<Void> postFeed(@Valid @RequestBody FeedCreateApiRequest request) {

        //로그인 된 사용자 확인 로직

        Long feedId = feedService.createFeed(request.toFeedCreateServiceRequest());

        URI uri = URI.create("/Feeds/" + feedId); // + feedId

        return ResponseEntity.created(uri).build();
    }

    @GetMapping("{feed-id}")
    public ResponseEntity<ApiSingleResponse<FeedResponse>> getFeed(@PathVariable("feed-id") Long feedId) {

        FeedResponse feed = feedService.getFeed(feedId);

        return ResponseEntity.of(ApiSingleResponse.ok(feed));
    }

    @PatchMapping("/{feed-id}")
    public ResponseEntity<Void> updateFeed(@PathVariable("feed-id") Long feedId,
                                           @RequestBody @Valid FeedUpdateApiRequest request) {


        feedService.updateFeed(feedId, request.toFeedUpdateServiceRequest());

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{feed-id}")
    public ResponseEntity<Void> deleteFeed(@PathVariable("feed-id") Long feedId) {

        feedService.deleteFeed(feedId);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{feed-id}/like")
    public ResponseEntity<Void> likeFeed(@PathVariable("feed-id") Long feedId) {

        feedLikeService.likeFeed(feedId);

        return ResponseEntity.noContent().build();
    }
    @PatchMapping("/{feed-id}/bookmark")
    public ResponseEntity<Void> bookmarkFeed(@PathVariable("feed-id") Long feedId) {

        feedBookmarkService.bookmarkFeed(feedId);

        return ResponseEntity.noContent().build();
    }
}
