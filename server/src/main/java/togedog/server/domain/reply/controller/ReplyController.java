package togedog.server.domain.reply.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.comment.controller.dto.CommentCreateApiRequest;
import togedog.server.domain.comment.entity.Comment;
import togedog.server.domain.comment.service.CommentService;
import togedog.server.domain.feed.controller.dto.FeedReportApiRequest;
import togedog.server.domain.feedreport.service.dto.response.FeedReportResponse;
import togedog.server.domain.reply.controller.dto.ReplyReportApiRequest;
import togedog.server.domain.reply.controller.dto.ReplyUpdateApiRequest;
import togedog.server.domain.reply.service.ReplyService;
import togedog.server.domain.reply.service.dto.response.ReplyResponse;
import togedog.server.domain.replylike.service.ReplyLikeService;
import togedog.server.domain.replyreport.service.ReplyReportService;
import togedog.server.domain.replyreport.service.dto.response.ReplyReportResponse;
import togedog.server.global.response.ApiPageResponse;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/replies")
public class ReplyController {

    private final ReplyService replyService;
    private final CommentService commentService;
    private final ReplyLikeService replyLikeService;
    private final ReplyReportService replyReportService;


    @PatchMapping("/{reply-id}")
    public ResponseEntity<Void> updateReply(@PathVariable("reply-id") Long replyId,
                                            @RequestBody @Valid ReplyUpdateApiRequest request) {

        replyService.UpdateReply(request.toServiceRequest(), replyId);


        return ResponseEntity.noContent().build();

    }

    @DeleteMapping("/{reply-id}")
    public ResponseEntity<Void> deleteReply(@PathVariable("reply-id") Long replyId) {

        replyService.deleteReply(replyId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{reply-id}/report")
    public ResponseEntity<Void> deleteReplyByReport(@PathVariable("reply-id") Long replyId) {

        replyService.deleteReplyByReport(replyId);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{reply-id}/like")
    public ResponseEntity<Void> likeReply(@PathVariable("reply-id") Long replyId) {

        replyLikeService.likeReply(replyId);

        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/{reply-id}/fix")
    private ResponseEntity<Void> fixReply(@PathVariable("reply-id") Long replyId) {

        replyService.fixReply(replyId);

        return ResponseEntity.noContent().build();
    }


    @PostMapping("{reply-id}/comment") //리플에 대한 코멘트 생성
    public ResponseEntity<Void> createComment(@PathVariable("reply-id") Long replyId,
                                              @RequestBody @Valid CommentCreateApiRequest request) {

        Long commentId = commentService.createComment(request.toServiceRequest(), replyId);
        URI uri = URI.create("/comment/" + commentId);

        return ResponseEntity.created(uri).build();
    }

    @PostMapping("/{reply-id}/report")
    public ResponseEntity<Void> reportReply(@PathVariable("reply-id") Long replyId,
                                            @Valid @RequestBody ReplyReportApiRequest request) {


        Long replyReportId = replyReportService.reportReply(request.replyReportApiToService(), replyId);

        URI uri = URI.create("/replies/report/" + replyReportId);

        return ResponseEntity.created(uri).build();

    }


    @GetMapping("/report")
    public ResponseEntity<ApiPageResponse<ReplyReportResponse>> reportReplyGet(@RequestParam(defaultValue = "1") int page,
                                                                               @RequestParam(defaultValue = "5") int size) {


        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdDateTime").descending());
        Page<ReplyReportResponse> replyReportsPage = replyReportService.getReplyReportPaged(pageable);

        return ResponseEntity.ok(ApiPageResponse.ok(replyReportsPage));
    }

    @PatchMapping("/report/{reply-report-id}")
    public ResponseEntity<Void> reportUpdate(@PathVariable("reply-report-id") Long replyReportId) {

        replyReportService.updateReportState(replyReportId);

        return ResponseEntity.noContent().build();
    }

    @GetMapping("/feed/{feed-id}")
    public ResponseEntity<ApiPageResponse<ReplyResponse>> getReplies(@RequestParam(defaultValue = "1") int page,
                                                                     @RequestParam(defaultValue = "5") int size,
                                                                     @PathVariable("feed-id") Long feedId) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdDateTime").descending());
        Page<ReplyResponse> repliesPaged = replyService.getRepliesPaged(feedId, pageable);

        return ResponseEntity.ok(ApiPageResponse.ok(repliesPaged));
    }

}
