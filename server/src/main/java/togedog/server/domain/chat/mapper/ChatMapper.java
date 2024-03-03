package togedog.server.domain.chat.mapper;

import org.springframework.stereotype.Component;
import togedog.server.domain.chat.entity.ChatParticipant;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.member.entity.Member;

@Component
public class ChatMapper {

    public ChatParticipant memberAndChatRoomToChatParticipant(Member member, ChatRoom chatRoom) {

        if(member == null || chatRoom == null) {
            return null;
        }
        else {
            return ChatParticipant
                    .builder()
                    .member(member)
                    .chatRoom(chatRoom)
                    .build();
        }
    }
}
