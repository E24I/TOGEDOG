package togedog.server.domain.chat.entity;

import lombok.*;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatRoomId;

    private String latestMessage = "not exist";

    @OneToMany(mappedBy = "chatRoom")
    private List<Message> messages = new ArrayList<>();

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatParticipant> chatParticipants = new ArrayList<>();

    @OneToMany(mappedBy = "chatRoom")
    private List<ChatReport> chatReports = new ArrayList<>();
}
