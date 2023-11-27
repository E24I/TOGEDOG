package togedog.server.domain.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import togedog.server.domain.comment.entity.Comment;
import togedog.server.domain.comment.repository.CommentRepository;
import togedog.server.domain.comment.service.dto.CommentCreateServiceRequest;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.domain.reply.repository.ReplyRepository;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.exception.businessexception.replyexception.ReplyNotFoundException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {

    //    private final MemberRepository memberRepository;
    private final ReplyRepository replyRepository;
    private final CommentRepository commentRepository;
    private final LoginMemberUtil loginMemberUtil;

    public Long createComment(CommentCreateServiceRequest request, Long replyId) {

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

//    Optional<Member> memberOptional = memberRepository.findById(memberId);
//    Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

    Optional<Reply> replyOptional = replyRepository.findById(replyId);
    Reply reply = replyOptional.orElseThrow(ReplyNotFoundException::new);

//    Comment comment = postComment(request, reply, member);
    Comment comment = postComment(request, reply);
        commentRepository.save(comment);

        return comment.getCommentId();

    }

    private Comment postComment(CommentCreateServiceRequest request, Reply reply) {
        return null;
    }
}
