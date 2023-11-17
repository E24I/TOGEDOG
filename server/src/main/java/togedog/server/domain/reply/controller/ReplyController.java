package togedog.server.domain.reply.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.comment.Controller.dto.CommentCreateApiRequest;
import togedog.server.domain.comment.entity.Comment;
import togedog.server.domain.comment.service.CommentService;
import togedog.server.domain.reply.service.ReplyService;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@RequestMapping("/replies")
public class ReplyController {

    private final ReplyService replyService;

    private final CommentService commentService;



    @PostMapping("{reply-id}/comments") //리플에 대한 코멘트 생성
    public ResponseEntity<Void> createComment(@PathVariable("reply-id") Long replyId,
                                              @RequestBody @Valid CommentCreateApiRequest request) {

        Long commentId = commentService.createComment(request.toServiceRequest(),replyId)
    }


}
