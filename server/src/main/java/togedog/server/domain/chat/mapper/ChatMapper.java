package togedog.server.domain.chat.mapper;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;
import togedog.server.domain.chat.dto.*;
import togedog.server.domain.chat.entity.ChatParticipant;
import togedog.server.domain.chat.entity.ChatReport;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.chat.entity.Message;
import togedog.server.domain.chat.repository.ChatParticipantRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.global.dto.SingleResponseDto;
import togedog.server.global.exception.businessexception.chatexception.ChatNotFoundException;
import togedog.server.global.response.PageInformation;

import java.util.Comparator;
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
            return chatRooms.stream().map(o -> chatRoomToResponse(o, currentMemberId)).sorted(Comparator.comparing(ChatRoomResponse::getModifiedAt).reversed()).collect(Collectors.toList());
        }
    }

    public ChatRoomResponse chatRoomToResponse(ChatRoom chatRoom, Long requestMemberId) {

        if(chatRoom == null) {
            return null;
        }
        else {
            List<ChatParticipant> chatParticipants = chatParticipantRepository.findByChatRoomChatRoomId(chatRoom.getChatRoomId());

            Long otherMemberId = 0L;

            for (ChatParticipant chatParticipant : chatParticipants) {
                Long tempMemberId = chatParticipant.getMember().getMemberId();
                if (!tempMemberId.equals(requestMemberId)) {
                    otherMemberId = tempMemberId;
                    break;
                }
            }

            if(otherMemberId == 0L) {
                throw new ChatNotFoundException();
            }

            return ChatRoomResponse.builder()
                    .chatRoomId(chatRoom.getChatRoomId())
                    .otherMemberId(otherMemberId)
                    .latestMessage(chatRoom.getLatestMessage())
                    .createdAt(chatRoom.getCreatedDateTime().toString())
                    .modifiedAt(chatRoom.getModifiedDateTime().toString())
                    .build();
        }
    }

    public ChatReportResponse chatReportToChatReportResponse(ChatReport chatReport) {
        if(chatReport == null) {
            return null;
        }
        else {
            return ChatReportResponse.builder()
                    .chatReportId(chatReport.getChatReportId())
                    .reportState(chatReport.getReportState().toString())
                    .content(chatReport.getContent())
                    .chatRoomId(chatReport.getChatRoom().getChatRoomId())
                    .reportedMemberId(chatReport.getReportedMemberId())
                    .build();
        }
    }

    public ChatReportPageResponse chatReportPageToChatReportPageResponses(Page<ChatReport> reports) {
        if(reports == null) {
            return null;
        }
        else {
            List<ChatReport> reportList = reports.getContent();
            List<ChatReportResponse> reportResponses = reportList.stream().map(this::chatReportToChatReportResponse).collect(Collectors.toList());
            PageInformation pageInformation = PageInformation.of(reports);

            return ChatReportPageResponse.builder()
                    .reports(reportResponses)
                    .pageInformation(pageInformation)
                    .build();
        }
    }
}
