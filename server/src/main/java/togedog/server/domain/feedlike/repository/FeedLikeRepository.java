package togedog.server.domain.feedlike.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.member.entity.Member;

import java.util.Optional;

public interface FeedLikeRepository extends JpaRepository<FeedLike, Long> {

    Optional<FeedLike> findByMemberAndFeed(Member member, Feed feed);
    Optional<FeedLike> findByMemberID(Long memberId, Long feedId);

    boolean existLikeByMemberAndFeed(Member member, Feed feed);



}
