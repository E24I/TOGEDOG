package togedog.server.domain.chat.mapper;

import org.springframework.stereotype.Component;
import togedog.server.domain.chat.dto.MessageRequest;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.chat.entity.Message;
import togedog.server.domain.member.entity.Member;

@Component
public class MessageMapper {

    public Message messageRequestToMessage(MessageRequest messageRequest, Member member, ChatRoom chatRoom) {
        if(messageRequest == null) {
            return null;
        }
        else {
            return Message.builder()
                    .memberId(member.getMemberId())
                    .content(messageRequest.getContent())
                    .chatRoom(chatRoom)
                    .build();
        }
    }
}
