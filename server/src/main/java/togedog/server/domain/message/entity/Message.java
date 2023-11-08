package togedog.server.domain.message.entity;

import togedog.server.domain.chatroom.entity.ChatRoom;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Message extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    private Long memberId;

    private LocalDateTime time;

    private String content;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;
}
