package togedog.server.domain.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.chat.entity.ChatParticipant;

import java.util.List;

public interface ChatParticipantRepository extends JpaRepository<ChatParticipant, Long> {

    List<ChatParticipant> findByMemberMemberIdAndChatRoomChatRoomId(Long memberId, Long chatRoomId);

    List<ChatParticipant> findByMemberMemberId(Long memberId);

    List<ChatParticipant> findByChatRoomChatRoomId(Long chatRoomId);
}
