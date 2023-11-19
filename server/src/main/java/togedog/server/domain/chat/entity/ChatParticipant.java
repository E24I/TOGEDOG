package togedog.server.domain.chat.entity;

import lombok.Builder;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.member.entity.Member;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Builder
public class ChatParticipant extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatParticipantId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;
}