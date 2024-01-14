package togedog.server.domain.feedlike.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import togedog.server.domain.alarm.entity.Alarm;
import togedog.server.domain.alarm.repository.AlarmRepository;
import togedog.server.domain.alarm.service.AlarmService;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.repository.FeedRepository;
import togedog.server.domain.feed.service.FeedService;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.feedlike.repository.FeedLikeRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;

import javax.transaction.Transactional;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class FeedLikeService {

    private final FeedRepository feedRepository;
    private final MemberRepository memberRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final LoginMemberUtil loginMemberUtil;
    private final AlarmService alarmService;
    private final AlarmRepository alarmRepository;

    public void likeFeed(Long feedId) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Optional<Member> memberOptional = memberRepository.findById(loginMemberId);
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        Optional<Feed> feedOptional = feedRepository.findByFeedIdAndDeleteYnIsFalse(feedId);
        Feed feed = feedOptional.orElseThrow(FeedNotFoundException::new);

        Optional<FeedLike> alreadyLike = feedLikeRepository.findByMemberAndFeed(member, feed);
        // 지금은 연관관계로 조회하지만 성능을 위해 다음 @EmbeddedId나 @IdClass를 알아보자

        // 오류 옵셔널 문제가 아니라 feed 만들 때 0으로 초기화 안해줘서 그럼

        if (alreadyLike.isPresent()) { // 현재 로직은 있으면 delete or 객체 생성인데 다음엔 타입으로 받고 내리고 올리자
            feedLikeRepository.delete(alreadyLike.get());
            feed.setLikeCount(feed.getLikeCount() - 1);
        } else {
            FeedLike newfeedLike = FeedLike.builder()
                    .member(member)
                    .feed(feed)
                    .build();

            feedLikeRepository.save(newfeedLike);
            feed.setLikeCount(feed.getLikeCount() + 1);
        }

        feedRepository.save(feed);

        //이재우: Feed 좋아요 알림 추가
        String alarmUrl = "http://togedog.kr/feed/" + feed.getFeedId();
        String alarmContent = "\"" + feed.getTitle() + "\" 에 좋아요를 받았습니다.";
        alarmService.notify(member.getMemberId(), alarmContent, alarmUrl);
        Alarm alarm = Alarm.builder()
                .content(alarmContent)
                .url(alarmUrl)
                .sender(member)
                .receiver(member)
                .build();
        alarmRepository.save(alarm);
    }

    private Feed addLike(Long loginMemberId, Long feedId) {
        return Feed.builder()

                .build();
    }


}
