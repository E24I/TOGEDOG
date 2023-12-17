package togedog.server.domain.comment.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import togedog.server.domain.comment.entity.Comment;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.reply.entity.Reply;

import java.util.Optional;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {

    Page<Comment> findByReplyAndDeleteYnIsFalse(Reply reply, Pageable pageable);

    Optional<Comment> findByCommentIdAndDeleteYnIsFalse(Long commentId);
}
