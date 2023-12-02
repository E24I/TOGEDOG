package togedog.server.domain.chat.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import togedog.server.domain.chat.dto.ChatRoomResponse;
import togedog.server.domain.chat.entity.ChatParticipant;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.chat.repository.ChatParticipantRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.global.dto.SingleResponseDto;
import togedog.server.global.exception.businessexception.chatexception.ChatNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class ChatMapper {

    private final ChatParticipantRepository chatParticipantRepository;

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

    public List<ChatRoomResponse> chatRoomsToResponses(List<ChatRoom> chatRooms, Long currentMemberId) {

        if(chatRooms == null) {
            return null;
        }
        else {
            return chatRooms.stream().map(o -> chatRoomToResponse(o, currentMemberId)).collect(Collectors.toList());
        }
    }

    private ChatRoomResponse chatRoomToResponse(ChatRoom chatRoom, Long requestMemberId) {

        if(chatRoom == null) {
            return null;
        }
        else {
            List<ChatParticipant> chatParticipants = chatParticipantRepository.findByChatRoomChatRoomId(chatRoom.getChatRoomId());

            Long otherMemberId = 0L;

            for (ChatParticipant chatParticipant : chatParticipants) {
                Long tempMemberId = chatParticipant.getMember().getMemberId();
                if (!tempMemberId.equals(requestMemberId)) {
                    otherMemberId = requestMemberId;
                    break;
                }
            }

            if(otherMemberId == 0L) {
                throw new ChatNotFoundException();
            }

            return ChatRoomResponse.builder()
                    .chatRoom_id(chatRoom.getChatRoomId())
                    .other_member_id(otherMemberId)
                    .latest_message(chatRoom.getLatestMessage())
                    .created_at(chatRoom.getCreatedDateTime().toString())
                    .build();
        }
    }
}
