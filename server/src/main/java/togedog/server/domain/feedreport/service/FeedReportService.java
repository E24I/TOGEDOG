package togedog.server.domain.feedreport.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.repository.FeedRepository;
import togedog.server.domain.feed.service.dto.request.FeedReportApiToService;
import togedog.server.domain.feedreport.repository.FeedReportRepository;
import togedog.server.domain.feedreport.entity.FeedReport;
import togedog.server.domain.feedreport.service.dto.response.FeedReportResponse;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.entity.ReportState;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;
import togedog.server.global.exception.businessexception.feedexception.FeedReportNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;
import togedog.server.global.exception.businessexception.memberexception.MemberRolesNotMatchException;

import javax.management.relation.Role;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedReportService {

    private final FeedRepository feedRepository;
    private final LoginMemberUtil loginMemberUtil;
    private final MemberRepository memberRepository;
    private final FeedReportRepository feedReportRepository;


    public Long reportFeed(FeedReportApiToService request, Long feedId) {

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Member member = findByLoginId(loginMemberId);
        //신고자


        Feed feed = findFeedRepository(feedId);
        //신고된 피드대상

        FeedReport newReport = createNewReport(request, feed, member);

        feedReportRepository.save(newReport);

        return newReport.getFeedReportId();
    }

    public Page<FeedReportResponse> getFeedReportPaged(Pageable pageable) {

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }
        Member member = findByLoginId(loginMemberId);

        memberRolesCheck(member);

        Page<FeedReport> feedReportPages = feedReportRepository.findByFeedReportState(pageable, ReportState.PROCEEDING);

        return feedReportPages.map(feedReport -> FeedReportResponse.feedReportSingleResponse(feedReport));
    }

    public void updateReportState(Long feedReportId) {

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Optional<Member> optionalMember = memberRepository.findById(loginMemberId);
        Member member = optionalMember.orElseThrow(MemberNotFoundException::new);

        memberRolesCheck(member);

        FeedReport feedReportUpdate = findFeedReport(feedReportId);

        updateReport(feedReportUpdate);

    }

    private Feed findFeedRepository(Long feedId) {

        Optional<Feed> feedOptional = feedRepository.findByFeedIdAndDeleteYnIsFalse(feedId);

        return feedOptional.orElseThrow(FeedNotFoundException::new);
    }

    private Member findByLoginId(Long loginMemberId) {
        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        return memberOptional.orElseThrow(MemberNotFoundException::new);

    }

    private void updateReport(FeedReport feedReportUpdate) {

        feedReportUpdate.setFeedReportState(ReportState.COMPLETE);
    }

    private FeedReport findFeedReport(Long feedReportId) {

        Optional<FeedReport> optionalFeedReport = feedReportRepository.findById(feedReportId);
        return optionalFeedReport.orElseThrow(FeedReportNotFoundException::new);

    }

    private FeedReport createNewReport(FeedReportApiToService request, Feed feed, Member member) {

       return FeedReport.CreateFeedReport(
                request.getContent(),
                member,
                feed);
    }
    private void memberRolesCheck(Member member) {

        if (!member.getEmail().equals("admin@admin.com"))
            throw new MemberRolesNotMatchException();
        }
    }

