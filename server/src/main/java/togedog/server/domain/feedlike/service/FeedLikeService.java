package togedog.server.domain.feedlike.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.repository.FeedRepository;
import togedog.server.domain.feed.service.FeedService;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.feedlike.repository.FeedLikeRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedLikeService {

    private final FeedService feedService;
    private final FeedRepository feedRepository;
    private final MemberRepository memberRepository;
    private final FeedLikeRepository feedLikeRepository;


    public void likeFeed(Long feedId) {

//        Long loginMemberId = SecurityUtil.getCurrentId();

        Long loginMemberId = 123L;

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Optional<Member> memberOptional = memberRepository.findById(loginMemberId);
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        Optional<Feed> feedOptional = feedRepository.findById(feedId);
        Feed feed = feedOptional.orElseThrow(FeedNotFoundException::new);

        Optional<FeedLike> byMemberAndFeed = feedLikeRepository.findByMemberAndFeed(member, feed);

    }


}
