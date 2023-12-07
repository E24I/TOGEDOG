package togedog.server.domain.comment.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.comment.service.CommentService;
import togedog.server.domain.comment.service.dto.response.CommentResponse;
import togedog.server.global.response.ApiPageResponse;
import togedog.server.global.response.ApiSingleResponse;

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
        Pageable pageable = PageRequest.of(page - 1, size);
        Page<CommentResponse> commentResponse = commentService.getComments(replyId, pageable);

        return ResponseEntity.ok(ApiPageResponse.ok(commentResponse));
    }



}
