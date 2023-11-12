package togedog.server.domain.message.entity;

import lombok.Getter;
import lombok.Setter;
import togedog.server.domain.chatroom.entity.ChatRoom;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Message extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long messageId;

    private Long memberId;

    private String content;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;
}
