package togedog.server.domain.feedbookmark.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feedbookmark.entity.FeedBookmark;
import togedog.server.domain.member.entity.Member;

import java.util.Optional;

public interface FeedBookmarkRepository extends JpaRepository<FeedBookmark, Long> {

    Optional<FeedBookmark> findByMemberAndFeed(Member member, Feed feed);

}
