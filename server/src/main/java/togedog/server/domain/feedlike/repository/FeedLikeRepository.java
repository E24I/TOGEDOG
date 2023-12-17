package togedog.server.domain.feedlike.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.member.entity.Member;

import java.util.Optional;

public interface FeedLikeRepository extends JpaRepository<FeedLike, Long> {

    Optional<FeedLike> findByMemberAndFeed(Member member, Feed feed);

    Page<FeedLike> findAllByMember(Pageable pageable, Member member);

//    boolean existByMemberAndFeed(Member member, Feed feed);



}
