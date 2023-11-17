package togedog.server.domain.chatreport.entity;

import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
public class ChatReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatReportId;

    private String content;

    @ManyToOne
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;
}
