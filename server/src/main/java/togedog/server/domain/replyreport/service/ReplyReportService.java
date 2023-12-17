package togedog.server.domain.replyreport.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.service.dto.request.FeedReportApiToService;
import togedog.server.domain.feedreport.entity.FeedReport;
import togedog.server.domain.feedreport.service.dto.response.FeedReportResponse;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.domain.reply.repository.ReplyRepository;
import togedog.server.domain.reply.service.dto.request.ReplyReportApiToService;
import togedog.server.domain.replyreport.entity.ReplyReport;
import togedog.server.domain.replyreport.repository.ReplyReportRepository;
import togedog.server.domain.replyreport.service.dto.response.ReplyReportResponse;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.entity.ReportState;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;
import togedog.server.global.exception.businessexception.memberexception.MemberRolesNotMatchException;
import togedog.server.global.exception.businessexception.replyexception.ReplyNotFoundException;
import togedog.server.global.exception.businessexception.replyexception.ReplyReportNotFoundException;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ReplyReportService {

    private final LoginMemberUtil loginMemberUtil;
    private final MemberRepository memberRepository;
    private final ReplyRepository replyRepository;
    private final ReplyReportRepository replyReportRepository;

    public Long reportReply(ReplyReportApiToService request, Long replyId) {

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Member member = findByLoginId(loginMemberId);
        //신고자


        Optional<Reply> optionalReply = replyRepository.findByReplyIdAndDeleteYnFalse(replyId);
        Reply reply = optionalReply.orElseThrow(ReplyNotFoundException::new);
        //신고된 리플대상

        ReplyReport newReport = createNewReport(request, reply, member);

        replyReportRepository.save(newReport);

        return newReport.getReplyReportId();


    }

    public Page<ReplyReportResponse> getReplyReportPaged(Pageable pageable) {

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }
        Member member = findByLoginId(loginMemberId);

        memberRolesCheck(member);

        Page<ReplyReport> replyReportPages = replyReportRepository.findByReplyReportState(pageable, ReportState.PROCEEDING);

        return replyReportPages.map(replyReport -> ReplyReportResponse.replyReportSingleResponse(replyReport));
    }

    public void updateReportState(Long replyReportId) {

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Member member = findByLoginId(loginMemberId);

        memberRolesCheck(member);

        ReplyReport replyReportUpdate = findReplyReport(replyReportId);

        updateReport(replyReportUpdate);

    }

    private void updateReport(ReplyReport replyReportUpdate) {
        replyReportUpdate.setReplyReportState(ReportState.COMPLETE);
    }

    private ReplyReport findReplyReport(Long replyReportId) {
        Optional<ReplyReport> optionalReplyReport = replyReportRepository.findById(replyReportId);

        return optionalReplyReport.orElseThrow(ReplyReportNotFoundException::new);
    }

    private void memberRolesCheck(Member member) {

        if (!member.getEmail().equals("admin@admin.com"))
            throw new MemberRolesNotMatchException();
    }

    private ReplyReport createNewReport(ReplyReportApiToService request, Reply reply, Member member) {

        return ReplyReport.createReplyReport(
                request.getContent(),
                member,
                reply);
    }



    private Member findByLoginId(Long loginMemberId) {
        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        return memberOptional.orElseThrow(MemberNotFoundException::new);

    }
}


