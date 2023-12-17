package togedog.server.domain.comment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.comment.controller.dto.CommentReportApiRequest;
import togedog.server.domain.comment.controller.dto.CommentUpdateApiRequest;
import togedog.server.domain.comment.service.CommentService;
import togedog.server.domain.comment.service.dto.response.CommentResponse;
import togedog.server.domain.commentreport.entity.CommentReport;
import togedog.server.domain.commentreport.service.CommentReportService;
import togedog.server.domain.commentreport.service.dto.response.CommentReportResponse;
import togedog.server.domain.feedreport.service.dto.response.FeedReportResponse;
import togedog.server.domain.reply.controller.dto.ReplyReportApiRequest;
import togedog.server.global.response.ApiPageResponse;
import togedog.server.global.response.ApiSingleResponse;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@Validated
public class CommentController {

    private final CommentService commentService;
    private final CommentReportService commentReportService;

    @GetMapping("reply/{reply-id}")
    public ResponseEntity<ApiPageResponse<CommentResponse>> getComments(@PathVariable("reply-id") Long replyId,
                                                                        @RequestParam(defaultValue = "1") int page,
                                                                        @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdDateTime").descending());
        Page<CommentResponse> commentResponse = commentService.getComments(replyId, pageable);

        return ResponseEntity.ok(ApiPageResponse.ok(commentResponse));
    }


    @PatchMapping("/{comment-id}")
    public ResponseEntity<Void> updateComment(@PathVariable("comment-id") Long commentId,
                                              @Valid @RequestBody CommentUpdateApiRequest request) {

        commentService.updateComment(commentId, request.ToCommentUpdateService());

        return ResponseEntity.noContent().build();

    }

    @DeleteMapping("/{comment-id}")
    public ResponseEntity<Void> deleteComment(@PathVariable("comment-id") Long commentId) {

        commentService.deleteComment(commentId);

        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{comment-id}/report")
    public ResponseEntity<Void> deleteCommentByReport(@PathVariable("comment-id") Long commentId) {

        commentService.deleteCommentByReport(commentId);

        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{comment-id}/report")
    public ResponseEntity<Void> reportComment(@PathVariable("comment-id") Long commentId,
                                            @Valid @RequestBody CommentReportApiRequest request) {


        Long commentReportId = commentReportService.reportComment(request.commentReportApiToService(), commentId);

        URI uri = URI.create("/comments/report/" + commentReportId);

        return ResponseEntity.created(uri).build();

    }

    @GetMapping("/report")
    public ResponseEntity<ApiPageResponse<CommentReportResponse>> reportCommentGet(@RequestParam(defaultValue = "1") int page,
                                                                                @RequestParam(defaultValue = "5") int size) {


        Pageable pageable = PageRequest.of(page - 1, size, Sort.by("createdDateTime").descending());
        Page<CommentReportResponse> commentReportsPage = commentReportService.getCommentReportPaged(pageable);

        return ResponseEntity.ok(ApiPageResponse.ok(commentReportsPage));
    }

    @PatchMapping("/report/{comment-report-id}")
    public ResponseEntity<Void> reportUpdate(@PathVariable("comment-report-id") Long commentReportId) {

        commentReportService.updateReportState(commentReportId);

        return ResponseEntity.noContent().build();
    }
}
