package togedog.server.domain.feed.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togedog.server.domain.feed.controller.dto.FeedCreateApiRequest;
import togedog.server.domain.feed.controller.dto.FeedUpdateApiRequest;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.repository.FeedRepository;
import togedog.server.domain.feed.service.dto.request.FeedCreateServiceApiRequest;
import togedog.server.domain.feed.service.dto.request.FeedUpdateServiceRequest;
import togedog.server.domain.feed.service.dto.response.FeedResponse;
import togedog.server.domain.feedbookmark.entity.FeedBookmark;
import togedog.server.domain.feedbookmark.repository.FeedBookmarkRepository;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.feedlike.repository.FeedLikeRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.exception.businessexception.memberexception.MemberAccessDeniedException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;

import javax.validation.Valid;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class FeedService {

    private final FeedRepository feedRepository;
    private final MemberRepository memberRepository;
    private final FeedBookmarkRepository feedBookmarkRepository;
    private final FeedLikeRepository feedLikeRepository;


    public Long createFeed(FeedCreateServiceApiRequest request) {

        Long loginMemberId = 12313L; // 멤버 확인하는 로그인된 멤버를 로그인된 사용자 가정

        if (loginMemberId == null) { // 로그인된 사용자를 가져올 때 해영님이
            throw new MemberNotLoginException();
        }

        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        Feed feed = postFeed(request, member);
        feedRepository.save(feed);

        return feed.getFeedId();
    }

    public Page<FeedResponse> getFeedsPaged(Pageable pageable) {

        Long loginMemberId = 12313L; // 멤버 확인하는 로그인된 멤버를 로그인된 사용자 가정
//         로그인된 사용자와 feedbookmark에서 찾아온 memeberId가 일치한다면, feed에 bookmarkYn을
//         true로 바꿔주고 피드에 업데이트 하면 될듯 ? 그리고 그 피드를 찾아오자!

        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        Page<Feed> feedsPage = feedRepository.findByOpenYnTrue(pageable);
//        return feedsPage.map(FeedResponse::singleFeedResponse);

        return feedsPage.map(feed -> {
            boolean isBookmarkedByCurrentUser = isFeedBookmarkedByMember(member, feed);

            boolean isLikedByCurrentUser = isFeedLikedByMember(member, feed);

            return FeedResponse.singleFeedResponse(feed, isBookmarkedByCurrentUser, isLikedByCurrentUser);
        });
    }

        public boolean isFeedBookmarkedByMember(Member member, Feed feed) {
            return feedBookmarkRepository.existBookmarkByMemberAndFeed(member, feed);
        }

    public boolean isFeedLikedByMember(Member member, Feed feed) {
        return feedLikeRepository.existLikeByMemberAndFeed(member, feed);
    }


    public FeedResponse getFeed(Long feedId) {

        Optional<Feed> feedOptional = feedRepository.findById(feedId);
        Feed feed = feedOptional.orElseThrow(FeedNotFoundException::new);

        // 댓글도 페이징 처리해서 넘기자 0,5 사이즈로 정하고 리스트말고

        return null;
    }




    public void updateFeed(Long feedId, FeedUpdateServiceRequest request) {

        Long loginMemberId = 123L;
        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Feed feedUpdate = findFeedRepository(feedId);

        checkAccessAuthority(feedUpdate.getMember().getMemberId(), loginMemberId);

        updateFeed(feedUpdate, request);

    }

    public void deleteFeed(Long feedId) {

        Long loginMemberId = 123L;
        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Feed feedDelete = findFeedRepository(feedId);

        checkAccessAuthority(feedDelete.getMember().getMemberId(), loginMemberId);

        feedDelete.deleteMyFeed();
    }

    private void updateFeed(Feed feedUpdate, FeedUpdateServiceRequest request) {

        feedUpdate.updateMyFeed(
                request.getTitle(),
                request.getContent(),
                request.getOpenYn()
        );
    }

    private Feed findFeedRepository(Long feedId) {

        Optional<Feed> feedOptional = feedRepository.findById(feedId);
//        Feed findInfeed = feedOptional.orElseThrow(FeedNotFoundException::new); 이렇게 리턴할까 ?
        return feedOptional.orElseThrow(FeedNotFoundException::new);
    }

    private void checkAccessAuthority(Long AuthorId, Long loginMemberId) { //aop 시키고 싶음
        if (!AuthorId.equals(loginMemberId)) {
            throw new MemberAccessDeniedException();
        }
    }

    private Feed postFeed(FeedCreateServiceApiRequest request, Member member) {
        return Feed.createFeed(
                request.getTitle(),
                request.getContent(),
                request.getAddress(),
                request.getOpenYn(),
                request.getAddMap(),
                request.getVideos(),
                request.getImages(),
                member

        );
    }

}
