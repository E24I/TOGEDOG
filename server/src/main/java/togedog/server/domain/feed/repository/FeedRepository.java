package togedog.server.domain.feed.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.member.entity.Member;

public interface FeedRepository extends JpaRepository<Feed, Long> {

    Page<Feed> findByOpenYnTrueAndDeleteYnIsFalse(Pageable pageable);

    Page<Feed> findAllByMember(Member member, Pageable pageable);

//    Feed findByOpenYnTrueAndDeleteYnFalse(Long feedId);
}
