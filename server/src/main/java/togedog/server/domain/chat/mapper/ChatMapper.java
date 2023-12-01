package togedog.server.domain.chat.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import togedog.server.domain.chat.dto.ChatRoomResponse;
import togedog.server.domain.chat.entity.ChatParticipant;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.chat.repository.ChatParticipantRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.global.dto.SingleResponseDto;

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

    public List<ChatRoomResponse> chatRoomsToResponses(List<ChatRoom> chatRooms) {

        if(chatRooms == null) {
            return null;
        }
        else {
            return chatRooms.stream().map(this::chatRoomToResponse).collect(Collectors.toList());
        }
    }

    private ChatRoomResponse chatRoomToResponse(ChatRoom chatRoom) {

        if(chatRoom == null) {
            return null;
        }
        else {
            List<ChatParticipant> chatParticipants = chatParticipantRepository.findByChatRoomChatRoomId(chatRoom.getChatRoomId());

            return ChatRoomResponse.builder()
                    .chatRoom_id(chatRoom.getChatRoomId())
                    .participant_member_1(chatParticipants.get(0).getMember().getMemberId())
                    .participant_member_2(chatParticipants.get(1).getMember().getMemberId())
                    .latest_message("미구현")
                    .created_at(chatRoom.getCreatedDateTime().toString())
                    .build();
        }
    }
}
