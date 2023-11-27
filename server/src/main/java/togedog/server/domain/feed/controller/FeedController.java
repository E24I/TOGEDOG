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
import togedog.server.global.image.ImageNameDTO;
import togedog.server.domain.feed.service.FeedService;
import togedog.server.domain.feed.service.dto.response.FeedResponse;
import togedog.server.domain.feedbookmark.service.FeedBookmarkService;
import togedog.server.domain.feedlike.service.FeedLikeService;
import togedog.server.domain.reply.controller.dto.ReplyCreateApiRequest;
import togedog.server.domain.reply.service.ReplyService;
import togedog.server.global.image.PresignedUrlService;
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
    private final ReplyService replyService;
    private final PresignedUrlService presignedUrlService;
    private String path;



    @GetMapping("/") //전체 피드 반환 이미지 처리 다시하자
    public ResponseEntity<ApiPageResponse<FeedResponse>> getFeeds(@RequestParam(defaultValue = "1") int page,
                                                                  @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<FeedResponse> feedsPage = feedService.getFeedsPaged(pageable);

        return ResponseEntity.ok(ApiPageResponse.ok(feedsPage));
    }

//    @GetMapping("/{feed-id}") //한 피드에 대한 feply 페이징 조회
//    public ResponseEntity<ApiPageResponse<ReplyResponse>> getRepliesByFeedId(@PathVariable("feed-id") Long feedId,
//                                                                               @RequestParam(defaultValue = "1") int page,
//                                                                               @RequestParam(defaultValue = "3") int size) {
//
//        Pageable pageable = PageRequest.of(page - 1, size);
//        Page<ReplyResponse> repliesPage = replyService.getRepliesPaged(feedId, pageable);
//
//        return ResponseEntity.ok(ApiPageResponse.ok(repliesPage));
//    }


    @PostMapping
    public ResponseEntity<Void> postFeed(@Valid @RequestBody FeedCreateApiRequest request) {

        //로그인 된 사용자 확인 로직

        Long feedId = feedService.createFeed(request.toFeedCreateServiceRequest());

        URI uri = URI.create("/feeds/" + feedId); // + feedId

        return ResponseEntity.created(uri).build();
    }

    @GetMapping("{feed-id}")
    public ResponseEntity<ApiSingleResponse<FeedResponse>> getFeed(@PathVariable("feed-id") Long feedId) {

        FeedResponse feed = feedService.getFeed(feedId);

        return null;
       // return ResponseEntity.of(ApiSingleResponse.ok(FeedResponse.));
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

    @PostMapping("/{feed-id}/replies")
    public ResponseEntity<Void> postReply(@PathVariable(("feed-id")) Long feedId,
                                          @Valid @RequestBody ReplyCreateApiRequest request) {

        //로그인 된 사용자 확인 로직

        Long replyId = replyService.createReply(request.toCreateServiceApiRequest(),feedId);

        URI uri = URI.create("/Replies/" + replyId);

        return ResponseEntity.created(uri).build();
    }

//    @PostMapping("/presigned")
//    public String createPresigned(@RequestBody ImageNameDTO imageNameDTO
//    ) {
//        path ="contact";  //원하는 경로 지정
//        String imageName = imageNameDTO.getImageName();
//        return presignedUrlService.getPreSignedUrl(path, imageName);
//    }
}
