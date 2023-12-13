package togedog.server.domain.reply.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.comment.controller.dto.CommentCreateApiRequest;
import togedog.server.domain.comment.entity.Comment;
import togedog.server.domain.comment.service.CommentService;
import togedog.server.domain.reply.controller.dto.ReplyUpdateApiRequest;
import togedog.server.domain.reply.service.ReplyService;
import togedog.server.domain.replylike.service.ReplyLikeService;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/replies")
public class ReplyController {

    private final ReplyService replyService;

    private final CommentService commentService;
    private final ReplyLikeService replyLikeService;


    @PatchMapping("/{reply-id}")
    public ResponseEntity<Void> updateReply(@PathVariable("reply-id") Long replyId,
                                            @RequestBody @Valid ReplyUpdateApiRequest request) {

        replyService.UpdateReply(request.toServiceRequest(),replyId);


        return ResponseEntity.noContent().build();

    }

    @DeleteMapping("/{reply-id}")
    public ResponseEntity<Void> deleteReply(@PathVariable("reply-id") Long replyId) {

        replyService.deleteReply(replyId);

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

        return ResponseEntity.noContent().build();}


    @PostMapping("{reply-id}/comment") //리플에 대한 코멘트 생성
    public ResponseEntity<Void> createComment(@PathVariable("reply-id") Long replyId,
                                              @RequestBody @Valid CommentCreateApiRequest request) {

        Long commentId = commentService.createComment(request.toServiceRequest(), replyId);
        URI uri = URI.create("/comment/" + commentId);

        return ResponseEntity.created(uri).build();
    }




}
