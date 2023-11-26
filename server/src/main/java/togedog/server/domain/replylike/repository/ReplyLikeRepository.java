package togedog.server.domain.replylike.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.domain.replylike.entity.ReplyLike;

import java.util.Optional;

public interface ReplyLikeRepository extends JpaRepository<ReplyLike, Long> {

    Optional<ReplyLike> findByMemberAndReply(Member member, Reply reply);
//    Optional<ReplyLike> findByMemberId(Long memberId, Long replyId);
//
//    boolean existLikeByMemberIdAndReplyId(Long memberId, Long replyId);


}
