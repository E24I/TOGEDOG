package togedog.server.domain.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.chat.entity.ChatRoom;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
}
