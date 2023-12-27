package togedog.server.domain.chat.mapper;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import togedog.server.domain.chat.dto.MessagePageResponse;
import togedog.server.domain.chat.dto.MessageRequest;
import togedog.server.domain.chat.dto.MessageResponse;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.chat.entity.Message;
import togedog.server.domain.member.entity.Member;
import togedog.server.global.response.PageInformation;

import java.util.List;
import java.util.stream.Collectors;

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

    public MessageResponse messageToMessageResponse(Message message) {
        if(message == null) {
            return null;
        }
        else {
            return MessageResponse.builder()
                    .messageId(message.getMessageId())
                    .memberId(message.getMemberId())
                    .content(message.getContent())
                    .createAt(message.getCreatedDateTime().toString())
                    .build();
        }
    }

    public MessagePageResponse messagePageToMessagePageResponses(Page<Message> messages) {
        if(messages == null) {
            return null;
        }
        else {
            List<Message> messageList = messages.getContent();
            List<MessageResponse> messageResponses = messageList.stream().map(this::messageToMessageResponse).collect(Collectors.toList());
            PageInformation pageInformation = PageInformation.of(messages);

            return MessagePageResponse.builder()
                    .messages(messageResponses)
                    .pageInformation(pageInformation)
                    .build();
        }
    }
}
