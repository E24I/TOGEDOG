package togedog.server.domain.comment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.comment.controller.dto.CommentUpdateApiRequest;
import togedog.server.domain.comment.service.CommentService;
import togedog.server.domain.comment.service.dto.response.CommentResponse;
import togedog.server.global.response.ApiPageResponse;
import togedog.server.global.response.ApiSingleResponse;

import javax.validation.Valid;

@RestController
@RequestMapping("/comments")
@RequiredArgsConstructor
@Validated
public class CommentController {

    private final CommentService commentService;

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
}
