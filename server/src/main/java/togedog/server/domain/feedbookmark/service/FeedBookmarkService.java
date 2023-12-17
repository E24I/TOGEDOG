package togedog.server.domain.feedbookmark.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.repository.FeedRepository;
import togedog.server.domain.feed.service.FeedService;
import togedog.server.domain.feedbookmark.entity.FeedBookmark;
import togedog.server.domain.feedbookmark.repository.FeedBookmarkRepository;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;
import togedog.server.global.exception.businessexception.replyexception.ReplyNotFoundException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FeedBookmarkService {


    private final FeedBookmarkRepository feedBookmarkRepository;
    private final MemberRepository memberRepository;
    private final FeedRepository feedRepository;
    private final LoginMemberUtil loginMemberUtil;


    public void bookmarkFeed(Long feedId) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }


        Member member = findByLoginId(loginMemberId);

        Feed feed = findFeedRepository(feedId);

        Optional<FeedBookmark> alreadyBookmark = feedBookmarkRepository.findByMemberAndFeed(member, feed);


        if (alreadyBookmark.isPresent()) { // 현재 로직은 있으면 delete or 객체 생성인데 다음엔 타입으로 받고 내리고 올리자
            feedBookmarkRepository.delete(alreadyBookmark.get());

        } else {
            FeedBookmark newFeedBook = FeedBookmark.builder()
                    .member(member)
                    .feed(feed)
                    .build();

            feedBookmarkRepository.save(newFeedBook);

        }
    }

    private Feed findFeedRepository(Long feedId) {

        Optional<Feed> feedOptional = feedRepository.findByFeedIdAndDeleteYnIsFalse(feedId);

        return feedOptional.orElseThrow(FeedNotFoundException::new);
    }

    private Member findByLoginId(Long loginMemberId) {
        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        return memberOptional.orElseThrow(MemberNotFoundException::new);

    }

//    private Reply findReplyRepository(Long replyId) {
//
//        Optional<Reply> replyOptional = replyRepository.findByReplyIdAndDeleteYnFalse(replyId);
//
//        return replyOptional.orElseThrow(ReplyNotFoundException::new);
//    }
}