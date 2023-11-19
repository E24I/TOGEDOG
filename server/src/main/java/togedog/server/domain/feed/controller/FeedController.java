package togedog.server.domain.feed.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.feed.controller.dto.FeedCreateApiRequest;
import togedog.server.domain.feed.controller.dto.FeedUpdateApiRequest;
import togedog.server.domain.feed.service.FeedService;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.feedlike.service.FeedLikeService;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/feed")
@Validated
@RequiredArgsConstructor
public class FeedController {

    private FeedService feedService;
    private FeedLikeService feedLikeService;


    @GetMapping("/")
    public ResponseEntity<Void> getFeeds() {
        return null;
    }

    @PostMapping
    public ResponseEntity<Void> postFeed(@Valid @RequestBody FeedCreateApiRequest request) {

        //로그인 된 사용자 확인 로직

        Long feedId = feedService.createFeed(request.toFeedCreateServiceRequest());

        URI uri = URI.create("/Feeds/" + feedId); // + feedId

        return ResponseEntity.created(uri).build();
    }

    @GetMapping
    public ResponseEntity<Void> getFeed() {
        return null;
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

//        FeedLikeService.likeFeed(feedId);
        return null;
    }
}
