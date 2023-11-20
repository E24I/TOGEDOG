package togedog.server.domain.reply.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import togedog.server.domain.reply.entity.Reply;

@Repository
public interface ReplyRepository extends JpaRepository<Reply,Long> {

//    Page<Reply> findAllByFeed(Feed feed, Pageable pageable);



}
