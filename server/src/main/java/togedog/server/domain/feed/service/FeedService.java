package togedog.server.domain.feed.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togedog.server.domain.feed.controller.dto.FeedCreateApiRequest;
import togedog.server.domain.feed.controller.dto.FeedUpdateApiRequest;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.repository.FeedRepository;
import togedog.server.domain.feed.service.dto.request.FeedCreateServiceApiRequest;
import togedog.server.domain.feed.service.dto.request.FeedUpdateServiceRequest;
import togedog.server.domain.feed.service.dto.response.FeedDetailResponse;
import togedog.server.domain.feed.service.dto.response.FeedResponse;
import togedog.server.domain.feedbookmark.entity.FeedBookmark;
import togedog.server.domain.feedbookmark.repository.FeedBookmarkRepository;
import togedog.server.domain.feedimage.entity.FeedImage;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.feedlike.repository.FeedLikeRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.domain.reply.repository.ReplyRepository;
import togedog.server.domain.reply.service.ReplyService;
import togedog.server.domain.reply.service.dto.response.ReplyResponse;
import togedog.server.domain.replylike.entity.ReplyLike;
import togedog.server.domain.replylike.repository.ReplyLikeRepository;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.dto.PageInfo;
import togedog.server.global.exception.businessexception.memberexception.MemberAccessDeniedException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;
import togedog.server.global.response.PageInformation;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
@Transactional
public class FeedService {

    private final FeedRepository feedRepository;
    private final MemberRepository memberRepository;
    private final FeedBookmarkRepository feedBookmarkRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final LoginMemberUtil loginMemberUtil;
    private final ReplyService replyService;



    public Long createFeed(FeedCreateServiceApiRequest request) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId(); // 멤버 확인하는 로그인된 멤버를 로그인된 사용자 가정

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        Feed feed = postFeed(request, member);
        feedRepository.save(feed);

        return feed.getFeedId();
    }

    public Page<FeedResponse> getFeedsPaged(Pageable pageable) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId(); // 멤버 확인하는 로그인된 멤버를 로그인된 사용자 가정
//         로그인된 사용자와 feedbookmark에서 찾아온 memeberId가 일치한다면, feed에 bookmarkYn을
//         true로 바꿔주고 피드에 업데이트 하면 될듯 ? 그리고 그 피드를 찾아오자!
        if(loginMemberId != null) {
        // 여기서 로그인 안하고 볼 시랑 하고 볼 시 따로 처리

        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        Page<Feed> feedsPage = feedRepository.findByOpenYnTrue(pageable); // 여기서 deleteyn 여부도 찾아서 반환
//        return feedsPage.map(FeedResponse::singleFeedResponse);

        return feedsPage.map(feed -> {
            boolean isBookmarkedByCurrentUser = isFeedBookmarkedByMember(member, feed);

            boolean isLikedByCurrentUser = isFeedLikedByMember(member, feed);

            return FeedResponse.singleFeedResponse(feed, isBookmarkedByCurrentUser, isLikedByCurrentUser);
        });
        } else {

            Page<Feed> feedsPage = feedRepository.findByOpenYnTrue(pageable); // 여기서 deleteyn 여부도 찾아서 반환
//        return feedsPage.map(FeedResponse::singleFeedResponse); 11

            return feedsPage.map(feed -> {
                boolean isBookmarkedByCurrentUser = isFeedBookmarkedByMember(null, feed);

                boolean isLikedByCurrentUser = isFeedLikedByMember(null, feed);

                return FeedResponse.singleFeedResponse(feed, isBookmarkedByCurrentUser, isLikedByCurrentUser);
            });
        }
    }


    public FeedDetailResponse getFeedWithReplies(Long feedId) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId();

        if (loginMemberId != null) { // 있거나 or 빈 값이라도 들어올 때


        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);


        Optional<Feed> feedOptional = feedRepository.findById(feedId);
        Feed feed = feedOptional.orElseThrow(FeedNotFoundException::new);

        Page<ReplyResponse> pagedReplies = replyService.getRepliesPaged(feedId, PageRequest.of(0, 3), loginMemberId);
        List<ReplyResponse> replyResponses = pagedReplies.getContent();

        FeedDetailResponse.FeedReplies feedReplies = FeedDetailResponse.FeedReplies
                .builder()
                .replies(replyResponses)
                .pageInformation(PageInformation.of(pagedReplies))
                .build();

        boolean isBookmarkedByCurrentUser = isFeedBookmarkedByMember(member, feed);
        boolean isLikedByCurrentUser = isFeedLikedByMember(member, feed);

        return FeedDetailResponse.feedDetailResponse(feed, isBookmarkedByCurrentUser, isLikedByCurrentUser, feedReplies);

        } else {
            Optional<Feed> feedOptional = feedRepository.findById(feedId);
            Feed feed = feedOptional.orElseThrow(FeedNotFoundException::new);

            Page<ReplyResponse> pagedReplies = replyService.getRepliesPaged(feedId, PageRequest.of(0, 3), loginMemberId);
            List<ReplyResponse> replyResponses = pagedReplies.getContent();

            FeedDetailResponse.FeedReplies feedReplies = FeedDetailResponse.FeedReplies
                    .builder()
                    .replies(replyResponses)
                    .pageInformation(PageInformation.of(pagedReplies))
                    .build();

            boolean isBookmarkedByCurrentUser = isFeedBookmarkedByMember(null, feed); // 로그인되지 않았으므로 member 값은 null
            boolean isLikedByCurrentUser = isFeedLikedByMember(null, feed); // 로그인되지 않았으므로 member 값은 null

            return FeedDetailResponse.feedDetailResponse(feed, isBookmarkedByCurrentUser, isLikedByCurrentUser, feedReplies);
        }
    }





//    public FeedDetailResponse getFeed(Long feedId, Pageable pageable) {
//
//        Long loginMemberId =  loginMemberUtil.getLoginMemberId();
//
//        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
//        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);
//
//
//        Optional<Feed> feedOptional = feedRepository.findById(feedId);
//        Feed feed = feedOptional.orElseThrow(FeedNotFoundException::new);
//
//        Page<Reply> repliesPage = replyRepository.findByFeed(feed, pageable);
//
//        // 댓글도 페이징 처리해서 넘기자 0,5 사이즈로 정하고 리스트말고
//
//
//                    List<ReplyResponse> replyResponses = repliesPage.getContent().stream()
//                            .map(reply -> {
//                                boolean isLikedByCurrentUser = isReplyLikedByMember(member, reply);
//                                // 로그인한 사용자가 그 피드에 좋아요 했는 지 여부
//                    return ReplyResponse.singReplyResponse(reply, isLikedByCurrentUser);
//                })
//                .collect(Collectors.toList());
//        //로그인 한 사용자가 좋아했는 지
//        FeedDetailResponse.FeedReplies feedReplies = FeedDetailResponse.FeedReplies
//                .builder()
//                .replies(replyResponses)
//                .pageInformation(PageInformation.of(repliesPage))
//                .build();
//
//        boolean isBookmarkedByCurrentUser = isFeedBookmarkedByMember(member, feed);
//        boolean isLikedByCurrentUser = isFeedLikedByMember(member, feed);
//
//        FeedDetailResponse feedDetailResponseResponse = FeedDetailResponse.feedDetailResponse(feed, isBookmarkedByCurrentUser, isLikedByCurrentUser, replyResponses);
//
//
//        FeedResponse feedResponse = FeedResponse.singleFeedResponse(feed, isBookmarkedByCurrentUser, isLikedByCurrentUser);
//        FeedDetailResponse.FeedReplies feedReplies = FeedDetailResponse.feedDetailResponse(feed);
//
//        feedResponse.setReplies(feedReplies);
//        return Page.empty(); // 여기서 반환해야 할 페이지 정보를 포함한 객체를 만들어서 반환해주세요.
//    }
//






    public void updateFeed(Long feedId, FeedUpdateServiceRequest request) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId();
        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Feed feedUpdate = findFeedRepository(feedId);

        checkAccessAuthority(feedUpdate.getMember().getMemberId(), loginMemberId);

        updateFeed(feedUpdate, request);

    }

    public void deleteFeed(Long feedId) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId();
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
        List<String> imageUrls = request.getImages();
        List<FeedImage> feedImages = new ArrayList<>();
        if (imageUrls != null && !imageUrls.isEmpty()) {
            for (String imageUrl : imageUrls) {
                FeedImage feedImage = FeedImage.builder()
                        .feedImageUrl(imageUrl)
                        .build();
                feedImages.add(feedImage);
            }}
        return Feed.createFeed(
                request.getTitle(),
                request.getContent(),
                request.getAddress(),
                request.getOpenYn(),
                request.getAddMap(),
                feedImages,
                request.getVideos(),
                member

        );
    }

//    private boolean isReplyLikedByMember(Member member, Reply reply) {
//        Optional<ReplyLike> optionalReplyLike = replyLikeRepository.findByMemberAndReply(member, reply);
//        return optionalReplyLike.isPresent(); // Optional이 값으로 존재하면 true를 반환, 비어있으면 false를 반환1
//    }

    private boolean isFeedBookmarkedByMember(Member member, Feed feed) {
        Optional<FeedBookmark> optionalFeedBookmark = feedBookmarkRepository.findByMemberAndFeed(member, feed);
        return optionalFeedBookmark.isPresent();
    }

    private boolean isFeedLikedByMember(Member member, Feed feed) {
        Optional<FeedLike> optionalFeedLike = feedLikeRepository.findByMemberAndFeed(member, feed);
        return optionalFeedLike.isPresent(); // Optional이 값으로 존재하면 true를 반환, 비어있으면 false를 반환
    }



}


