package togedog.server.domain.comment.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import togedog.server.domain.comment.controller.dto.CommentUpdateApiRequest;
import togedog.server.domain.comment.entity.Comment;
import togedog.server.domain.comment.repository.CommentRepository;
import togedog.server.domain.comment.service.dto.request.CommentCreateServiceRequest;
import togedog.server.domain.comment.service.dto.request.CommentUpdateServiceRequest;
import togedog.server.domain.comment.service.dto.response.CommentResponse;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.domain.reply.repository.ReplyRepository;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.exception.businessexception.commentexception.CommentNotFoundException;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberAccessDeniedException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;
import togedog.server.global.exception.businessexception.memberexception.MemberRolesNotMatchException;
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

        Member member = findByLoginId(loginMemberId);

        Reply reply = findReplyRepository(replyId);

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

        Reply reply = findReplyRepository(replyId);



        Page<Comment> commentPage = commentRepository.findByReplyAndDeleteYnIsFalse(reply, pageable);

        return commentPage.map(comment -> CommentResponse.commentSingleResponse(comment)); // CommentResponse로 변환하여 반환
    }

    public void updateComment(Long commentId, CommentUpdateServiceRequest request) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();}


        findByLoginId(loginMemberId);

        Comment comment = findCommentRepository(commentId);


        checkAccessAuthority(comment.getMember().getMemberId(), loginMemberId);

        comment.updateNewContent(request.getContent());


    }

    public void deleteComment(Long commentId) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();}

        findByLoginId(loginMemberId);

        Comment comment = findCommentRepository(commentId);

        checkAccessAuthority(comment.getMember().getMemberId(), loginMemberId);

        Reply reply = findReplyRepository(comment.getReply().getReplyId());

        comment.deleteMyComment();

        reply.setCommentCount(reply.getCommentCount() - 1);


    }
    public void deleteCommentByReport(Long commentId) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId(); // 멤버 확인하는 로그인된 멤버를 로그인된 사용자 가정
        isLogin(loginMemberId);

        Member member = findByLoginId(loginMemberId);


        Comment comment = findCommentRepository(commentId);

        memberRolesCheck(member);


        Reply reply = findReplyRepository(comment.getReply().getReplyId());

        comment.deleteMyComment();

        reply.setCommentCount(reply.getCommentCount() - 1);


    }
    private void memberRolesCheck(Member member) {

        if (!member.getEmail().equals("admin@admin.com"))
            throw new MemberRolesNotMatchException();
    }

    private Member findByLoginId(Long loginMemberId) {
        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        return memberOptional.orElseThrow(MemberNotFoundException::new);

    }

    private Comment postComment(CommentCreateServiceRequest request, Reply reply, Member member) {
        return Comment.createComment(
                request.getContent(),
                reply,
                member
        );

    }

    private Long isLogin(Long loginMemberId) {
        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        return loginMemberId;
    }

    private void checkAccessAuthority(Long AuthorId, Long loginMemberId) {
        if (!AuthorId.equals(loginMemberId)) {
            throw new MemberAccessDeniedException();
        }
    }



    private Reply findReplyRepository(Long replyId) {

        Optional<Reply> replyOptional = replyRepository.findByReplyIdAndDeleteYnFalse(replyId);

        return replyOptional.orElseThrow(ReplyNotFoundException::new);
    }

//    private Feed findFeedRepository(Long feedId) {
//
//        Optional<Feed> feedOptional = feedRepository.findByFeedIdAndDeleteYnIsFalse(feedId);
//
//        return feedOptional.orElseThrow(FeedNotFoundException::new);
//    }

    private Comment findCommentRepository(Long commentId) {

        Optional<Comment> commentOptional = commentRepository.findByCommentIdAndDeleteYnIsFalse(commentId);

        return commentOptional.orElseThrow(CommentNotFoundException::new);
    }
}
