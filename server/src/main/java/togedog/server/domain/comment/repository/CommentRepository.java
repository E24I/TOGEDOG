package togedog.server.domain.comment.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.comment.entity.Comment;
import togedog.server.domain.reply.entity.Reply;

public interface CommentRepository extends JpaRepository<Comment,Long> {

    Page<Comment> findByReply(Reply reply, Pageable pageable);
}
