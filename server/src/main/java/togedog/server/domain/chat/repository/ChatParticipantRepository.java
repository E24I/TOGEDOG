package togedog.server.domain.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.chat.entity.ChatParticipant;

public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {
}
