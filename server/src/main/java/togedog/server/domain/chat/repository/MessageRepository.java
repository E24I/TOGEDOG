package togedog.server.domain.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.chat.entity.Message;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
