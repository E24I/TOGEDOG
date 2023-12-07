package togedog.server.domain.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import togedog.server.domain.comment.entity.Comment;
import togedog.server.domain.comment.repository.CommentRepository;
import togedog.server.domain.comment.service.dto.request.CommentCreateServiceRequest;
import togedog.server.domain.comment.service.dto.response.CommentResponse;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.domain.reply.repository.ReplyRepository;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.exception.businessexception.commentexception.CommentNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;
import togedog.server.global.exception.businessexception.replyexception.ReplyNotFoundException;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional
public class CommentService {

    private final MemberRepository memberRepository;
    private final ReplyRepository replyRepository;
    private final CommentRepository commentRepository;
    private final LoginMemberUtil loginMemberUtil;

    public Long createComment(CommentCreateServiceRequest request, Long replyId) {


        Long loginMemberId =  loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Optional<Member> memberOptional = memberRepository.findById(loginMemberId);
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

    Optional<Reply> replyOptional = replyRepository.findById(replyId);
    Reply reply = replyOptional.orElseThrow(ReplyNotFoundException::new);

    Comment comment = postComment(request, reply, member);
        commentRepository.save(comment);

        reply.setCommentCount(reply.getCommentCount() + 1);

        return comment.getCommentId();

    }

    public Page<CommentResponse> getComments(Long replyId, Pageable pageable) {

//        Long loginMemberId = loginMemberUtil.getLoginMemberId();
//
//        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
//        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        Optional<Reply> optionalReply = replyRepository.findById(replyId);
        Reply reply = optionalReply.orElseThrow(CommentNotFoundException::new);


        Page<Comment> commentPage = commentRepository.findByReply(reply, pageable);
        return commentPage.map(comment -> CommentResponse.commentSingleResponse(comment)); // CommentResponse로 변환하여 반환
    }

    private Comment postComment(CommentCreateServiceRequest request, Reply reply, Member member) {
        return Comment.createComment(
                request.getContent(),
                reply,
                member
        );

    }
}
