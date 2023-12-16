package togedog.server.domain.commentreport.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togedog.server.domain.comment.entity.Comment;
import togedog.server.domain.comment.repository.CommentRepository;
import togedog.server.domain.commentreport.entity.CommentReport;
import togedog.server.domain.commentreport.repository.CommentReportRepository;
import togedog.server.domain.commentreport.service.dto.request.CommentReportApiToService;
import togedog.server.domain.commentreport.service.dto.response.CommentReportResponse;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.domain.replyreport.entity.ReplyReport;
import togedog.server.domain.replyreport.service.dto.response.ReplyReportResponse;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.entity.ReportState;
import togedog.server.global.exception.businessexception.commentexception.CommentNotFoundException;
import togedog.server.global.exception.businessexception.commentexception.CommentReportNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;
import togedog.server.global.exception.businessexception.memberexception.MemberRolesNotMatchException;

import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class CommentReportService {

    private final CommentReportRepository commentReportRepository;
    private final LoginMemberUtil loginMemberUtil;
    private final MemberRepository memberRepository;
    private final CommentRepository commentRepository;


    public Long reportComment(CommentReportApiToService request, Long commentId) {

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Optional<Member> optionalMember = memberRepository.findById(loginMemberId);
        Member member = optionalMember.orElseThrow(MemberNotFoundException::new);
        //신고자

        Optional<Comment> optionalComment = commentRepository.findByCommentIdAndDeleteYnIsFalse(commentId);
        Comment comment = optionalComment.orElseThrow(CommentNotFoundException::new);

        CommentReport commentReport = createNewReport(request.getContent(), member, comment);

        commentReportRepository.save(commentReport);

        return commentReport.getCommentReportId();
    }

    public Page<CommentReportResponse> getCommentReportPaged(Pageable pageable) {

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }
        Optional<Member> optionalMember = memberRepository.findById(loginMemberId);
        Member member = optionalMember.orElseThrow(MemberNotFoundException::new);

        memberRolesCheck(member);

        Page<CommentReport> commentReportPages = commentReportRepository.findByCommentReportState(pageable, ReportState.PROCEEDING);

        return commentReportPages.map(commentReport -> CommentReportResponse.commentReportSingleResponse(commentReport));
    }

    public void updateReportState(Long commentReportId) {

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Optional<Member> optionalMember = memberRepository.findById(loginMemberId);
        Member member = optionalMember.orElseThrow(MemberNotFoundException::new);

        memberRolesCheck(member);

        CommentReport commentReportUpdate = findCommentReport(commentReportId);

        updateReport(commentReportUpdate);

    }

    private CommentReport findCommentReport(Long commentReportId) {
        Optional<CommentReport> optionalCommentReport = commentReportRepository.findById(commentReportId);
        return optionalCommentReport.orElseThrow(CommentReportNotFoundException::new);

    }

    private void updateReport(CommentReport commentReportUpdate) {
        commentReportUpdate.setCommentReportState(ReportState.COMPLETE);

    }

    private void memberRolesCheck(Member member) {

        if (!member.getEmail().equals("admin@admin.com"))
            throw new MemberRolesNotMatchException();
    }

    private CommentReport createNewReport(String content, Member member, Comment comment) {
        return CommentReport.createCommentReport(
                content,
                member,
                comment
        );

    }
}

