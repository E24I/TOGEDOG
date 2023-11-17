package togedog.server.domain.comment.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.comment.entity.Comment;

public interface CommentRepository extends JpaRepository<Comment,Long> {
}
