package togedog.server.domain.feedreport.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.repository.FeedRepository;
import togedog.server.domain.feed.service.dto.request.FeedReportApiToService;
import togedog.server.domain.feedreport.entity.FeedReport;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedReportService {

    private final FeedRepository feedRepository;
    private final LoginMemberUtil loginMemberUtil;
    private final MemberRepository memberRepository;


    public void reportFeed(FeedReportApiToService request, Long feedId) {

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        Optional<Member> optionalMember = memberRepository.findById(loginMemberId);
        Member member = optionalMember.orElseThrow(MemberNotFoundException::new);


        Optional<Feed> optionalFeed = feedRepository.findById(feedId);
        Feed feed = optionalFeed.orElseThrow(FeedNotFoundException::new);

        return;


    }
}
