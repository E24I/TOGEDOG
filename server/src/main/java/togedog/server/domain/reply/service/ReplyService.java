package togedog.server.domain.reply.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.repository.FeedRepository;
import togedog.server.domain.feed.service.dto.response.FeedResponse;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.domain.reply.repository.ReplyRepository;
import togedog.server.domain.reply.service.dto.request.ReplyServiceCreateApiRequest;
import togedog.server.domain.reply.service.dto.request.ReplyServiceUpdateApiRequest;
import togedog.server.domain.reply.service.dto.response.ReplyResponse;
import togedog.server.domain.replylike.entity.ReplyLike;
import togedog.server.domain.replylike.repository.ReplyLikeRepository;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.exception.businessexception.feedexception.FeedAlreadyDeleteException;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberAccessDeniedException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;
import togedog.server.global.exception.businessexception.replyexception.ReplyDontDeleteAboutFixException;
import togedog.server.global.exception.businessexception.replyexception.ReplyNotFoundException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service
@Transactional
public class ReplyService {

    private final ReplyRepository replyRepository;
    private final MemberRepository memberRepository;
    private final FeedRepository feedRepository;
    private final LoginMemberUtil loginMemberUtil;
    private final ReplyLikeRepository replyLikeRepository;


    public Long createReply(ReplyServiceCreateApiRequest request, Long feedId) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId(); // 멤버 확인하는 로그인된 멤버를 로그인된 사용자 가정
        isLogin(loginMemberId);


        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        Optional<Feed> feedOptional = feedRepository.findById(feedId);
        Feed feed = feedOptional.orElseThrow(FeedNotFoundException::new);

        Reply reply = postReply(request, member, feed);
        replyRepository.save(reply);

        feed.setRepliesCount(feed.getRepliesCount() + 1);
        // 리팩토링 시 getset 쓰지 않기, ( 연관관계 테이블 없애던가, or feed 메서드 만들기

        return reply.getReplyId();

    }

    public void UpdateReply(ReplyServiceUpdateApiRequest request, Long replyId) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId(); // 멤버 확인하는 로그인된 멤버를 로그인된 사용자 가정
        isLogin(loginMemberId);

        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        findByLoginId(loginMemberId);

        Optional<Reply> optionalReply = replyRepository.findById(replyId);
        Reply reply = optionalReply.orElseThrow(ReplyNotFoundException::new);

        checkAccessAuthority(reply.getMember().getMemberId(), loginMemberId);

        updateReply(request, reply);

    }

    public void deleteReply(Long replyId) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId(); // 멤버 확인하는 로그인된 멤버를 로그인된 사용자 가정
        isLogin(loginMemberId);

//        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
//        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        findByLoginId(loginMemberId);

        Optional<Reply> optionalReply = replyRepository.findById(replyId);
        Reply reply = optionalReply.orElseThrow(ReplyNotFoundException::new);

        if(reply.getFix()) { //고정 되어 있으면 삭제 불가능
            throw new ReplyDontDeleteAboutFixException();
        }

        Optional<Feed> optionalFeed = feedRepository.findById(reply.getFeed().getFeedId());
        Feed feed = optionalFeed.orElseThrow(FeedNotFoundException::new);

        checkAccessAuthority(reply.getMember().getMemberId(), loginMemberId);


        reply.deleteMyReply();

        feed.setRepliesCount(feed.getRepliesCount() - 1);


    }

    public Page<ReplyResponse> getRepliesPaged(Long feedId, Pageable pageable,  Long loginMemberId) {

        Pageable pageable1 = PageRequest.of(0,3, Sort.by("createdDateTime").descending());
        // 받아서 넘기니까 왠진 모르겠는데 안넘온다;; 그냐 여기서 만들어서 주자!
        if (loginMemberId != null) {
            Optional<Member> optionalMember = memberRepository.findById(loginMemberId);

            if (optionalMember.isPresent()) {
                Member member = optionalMember.get();


                Optional<Feed> feedOptional = feedRepository.findById(feedId);

                Feed feed = feedOptional.get();
                if (feed.getDeleteYn() == true) {
                    throw new FeedAlreadyDeleteException();
                }
                Page<Reply> repliesPage = replyRepository.findByFeedAndDeleteYnFalse(feed, pageable1);

                Page<ReplyResponse> replyResponses = repliesPage.map(reply -> {
                    boolean isLikedByCurrentUser = isReplyLikedByMember(member, reply); // 사용자에 따른 좋아요 여부 확인

                    // Reply 객체를 ReplyResponse 객체로 변환하여 반환
                    return ReplyResponse.singReplyResponse(reply, isLikedByCurrentUser);
                });

                return replyResponses;
            } else {
                throw new MemberNotLoginException();
            }
        } else { // null 값이 들어오면 똑같이 작동하는데 isLikeCurrentUser 유저에 fals로 반환
            Optional<Feed> feedOptional = feedRepository.findById(feedId);
            Feed feed = feedOptional.orElseThrow(FeedNotFoundException::new);

            if (feed.getDeleteYn() == true) {
                throw new FeedAlreadyDeleteException();
            }

            Page<Reply> repliesPage = replyRepository.findByFeedAndDeleteYnFalse(feed, pageable1);

            Page<ReplyResponse> replyResponses = repliesPage.map(reply ->
                    ReplyResponse.singReplyResponse(reply, false) // 로그인되지 않은 상태에서는 좋아요가 없는 상태로 가정
            );

            return replyResponses;
        }
    }

//    public Page<ReplyResponse> getRepliesPaged(Long feedId, Pageable pageable) {
//        Long loginMemberId = loginMemberUtil.getLoginMemberId();
//
//        Optional<Feed> feedOptional = feedRepository.findById(feedId);
//        Feed feed = feedOptional.orElseThrow(FeedNotFoundException::new);
//
//        Page<Reply> repliesPage = replyRepository.findByFeed(feed, pageable);
//
//        Page<ReplyResponse> replyResponses = repliesPage.map(reply ->
//                ReplyResponse.singReplyResponse(reply, isReplyLikedByMember(loginMemberId, reply))
//        );
//
//        return replyResponses;
//    }

    public void fixReply(Long replyId) {
        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        // ㄷ따로 리플 찾을 때 나중에 막기

        Optional<Reply> replyOptional = replyRepository.findById(replyId);
        Reply reply = replyOptional.orElseThrow(ReplyNotFoundException::new);

        Long feedId = reply.getFeed().getFeedId();
        Optional<Feed> feedOptional = feedRepository.findById(feedId);
        Feed feed = feedOptional.orElseThrow(FeedNotFoundException::new);

        checkAccessAuthority(feed.getFeedId(), loginMemberId);
        boolean foundMatchingReply = false;

        if (!feed.getReplyFix()) {
            // 피드의 replyFix가 false인 경우
            // 주어진 replyId를 가진 댓글을 고정합니다.
            reply.setFix(true);
            feed.setReplyFix(true);
        } else {

            for (Reply feedReply : feed.getReplies()) {
                if (feedReply.getFix()) {
                    if (feedReply.getReplyId().equals(replyId)) {
                        // 이미 고정된 댓글이 주어진 replyId와 일치하는 경우
                        feedReply.setFix(false); // 댓글의 고정을 취소합니다.
                        foundMatchingReply = true;
                        feed.setReplyFix(false);

                    } else {
                        feedReply.setFix(false); // 다른 댓글이 이미 고정된 경우 취소합니다.
                    }
                }
            }

            if (!foundMatchingReply) {
                // 주어진 replyId를 가진 댓글을 고정합니다.
                reply.setFix(true);
                feed.setReplyFix(true);
            }
        }

        replyRepository.save(reply);
        feedRepository.save(feed);

    }




    private Long isLogin(Long loginMemberId) {
        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        return loginMemberId;
    }

    private Member findByLoginId(Long loginMemberId) {
        Optional<Member> memberOptional = memberRepository.findById(loginMemberId); //로그인된 사용자의 멤버 아이디
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        return member;

    }
    private void checkAccessAuthority(Long AuthorId, Long loginMemberId) {
        if (!AuthorId.equals(loginMemberId)) {
            throw new MemberAccessDeniedException();
        }
    }

    private Reply postReply(ReplyServiceCreateApiRequest request, Member member, Feed feed) {

        return Reply.crateReply(
                request.getContent(),
                member,
                feed
        );
    }

    private void updateReply(ReplyServiceUpdateApiRequest request, Reply reply) {

        reply.updateMyReply(
                 request.getContent()
         );
    }



    private boolean isReplyLikedByMember(Member member, Reply reply) {
        Optional<ReplyLike> optionalReplyLike = replyLikeRepository.findByMemberAndReply(member, reply);
        return optionalReplyLike.isPresent(); // Optional이 값으로 존재하면 true를 반환, 비어있으면 false를 반환
    }

//    public boolean isReplyLikedByMember(Long memberId, Reply reply) {
//        if (memberId == null) {
//            // 만약 로그인되지 않은 경우, 좋아요 여부를 false로 반환하거나 다른 동작을 수행할 수 있습니다.
//            return false; // 현재 예제에서는 로그인되지 않은 상태에서는 좋아요가 되지 않은 상태로 가정합니다.
//        } else {
//            // 로그인된 경우, 회원 ID를 이용하여 현재 사용자가 해당 댓글에 좋아요를 눌렀는지 여부를 확인합니다.
//            Optional<Member> optionalMember = memberRepository.findById(memberId);
//            if (optionalMember.isPresent()) {
//                Member member = optionalMember.get();
//                return isReplyLikedByMember(member, reply); // 해당 회원이 댓글을 좋아했는지 여부 반환
//            } else {
//                throw new MemberNotFoundException();
//            }
//        }
//    }


}


