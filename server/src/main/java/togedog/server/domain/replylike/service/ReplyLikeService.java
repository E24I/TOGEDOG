package togedog.server.domain.replylike.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.domain.reply.repository.ReplyRepository;
import togedog.server.domain.replylike.entity.ReplyLike;
import togedog.server.domain.replylike.repository.ReplyLikeRepository;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.exception.businessexception.feedexception.FeedNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;
import togedog.server.global.exception.businessexception.replyexception.ReplyNotFoundException;

import java.util.Optional;
@Service
@RequiredArgsConstructor
public class ReplyLikeService {

    private final MemberRepository memberRepository;
    private final ReplyRepository replyRepository;
    private final ReplyLikeRepository replyLikeRepository;
    private final LoginMemberUtil loginMemberUtil;


    public void likeReply(Long replyId) {

        Long loginMemberId =  loginMemberUtil.getLoginMemberId();

        if (loginMemberId == null) {
            throw new MemberNotLoginException();
        }

        Optional<Member> memberOptional = memberRepository.findById(loginMemberId);
        Member member = memberOptional.orElseThrow(MemberNotFoundException::new);

        Optional<Reply> replyOptional = replyRepository.findById(replyId);
        Reply reply = replyOptional.orElseThrow(ReplyNotFoundException::new);

        Optional<ReplyLike> alreadyLike = replyLikeRepository.findByMemberAndReply(member, reply);
        // 지금은 연관관계로 조회하지만 성능을 위해 다음 @EmbeddedId나 @IdClass를 알아보자

        if (alreadyLike.isPresent()) { // 현재 로직은 있으면 delete or 객체 생성인데 다음엔 타입으로 받고 내리고 올리자
            replyLikeRepository.delete(alreadyLike.get());
            reply.setLikeCount(reply.getLikeCount() - 1);
        } else {
            ReplyLike newreplyLike = ReplyLike.builder()
                    .member(member)
                    .reply(reply)
                    .build();

            replyLikeRepository.save(newreplyLike);
            reply.setLikeCount(reply.getLikeCount() + 1);
        }

        replyRepository.save(reply);


    }
}
