package togedog.server.domain.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togedog.server.domain.chat.dto.ChatPostRequest;
import togedog.server.domain.chat.dto.ChatReportRequest;
import togedog.server.domain.chat.dto.ChatRoomResponse;
import togedog.server.domain.chat.entity.ChatParticipant;
import togedog.server.domain.chat.entity.ChatReport;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.chat.entity.Message;
import togedog.server.domain.chat.mapper.ChatMapper;
import togedog.server.domain.chat.repository.ChatParticipantRepository;
import togedog.server.domain.chat.repository.ChatReportRepository;
import togedog.server.domain.chat.repository.ChatRoomRepository;
import togedog.server.domain.chat.repository.MessageRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.exception.businessexception.chatexception.ChatBadRequestException;
import togedog.server.global.exception.businessexception.chatexception.ChatNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;

    private final MemberRepository memberRepository;

    private final ChatParticipantRepository chatParticipantRepository;

    private final ChatMapper chatMapper;

    private final MessageRepository messageRepository;

    private final ChatReportRepository chatReportRepository;

    @Transactional
    public Long createChatRoom(ChatPostRequest chatPostRequest) {

        if(chatPostRequest.getInviteMemberId().equals(chatPostRequest.getRequestMemberId())) {
            throw new ChatBadRequestException();
        }

        Member requestMember = findMemberById(chatPostRequest.getRequestMemberId());
        Member inviteMember = findMemberById(chatPostRequest.getInviteMemberId());

        ChatRoom chatRoom = new ChatRoom();
        chatRoom = chatRoomRepository.save(chatRoom);

        //참가자가 같은 방이 존재하면 Exception 발생
        verifyExistParticipant(requestMember.getMemberId(), inviteMember.getMemberId(), chatRoom.getChatRoomId());

        //채팅방 참가자(요청자, 초대자) save
        ChatParticipant requestParticipant = chatParticipantRepository
                .save(
                        chatMapper.memberAndChatRoomToChatParticipant(requestMember, chatRoom)
                );

        ChatParticipant inviteParticipant = chatParticipantRepository
                .save(
                        chatMapper.memberAndChatRoomToChatParticipant(inviteMember, chatRoom)
                );

        chatRoom.getChatParticipants().add(requestParticipant);
        chatRoom.getChatParticipants().add(inviteParticipant);

        return chatRoom.getChatRoomId();
    }

    public ChatRoomResponse findChatRoom(Long memberId, Long chatRoomId) {

        ChatRoom chatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(ChatNotFoundException::new);

        return chatMapper.chatRoomToResponse(chatRoom, memberId);
    }

    public List<ChatRoomResponse> findChatRooms(Long memberId) {
        List<ChatParticipant> chatParticipants = chatParticipantRepository.findByMemberMemberId(memberId);

        if(chatParticipants.isEmpty()) {
            throw new ChatNotFoundException();
        }

        List<Long> chatRoomIds = chatParticipants.stream().map(o -> o.getChatRoom().getChatRoomId()).collect(Collectors.toList());

        List<ChatRoom> chatRooms = chatRoomIds.stream().map(o -> chatRoomRepository.findById(o).orElseThrow(ChatNotFoundException::new)).collect(Collectors.toList());

        return chatMapper.chatRoomsToResponses(chatRooms, memberId);
    }

    public Boolean deleteRoom(Long chatRoomId) {

        ChatRoom findChatRoom = chatRoomRepository.findById(chatRoomId).orElseThrow(ChatNotFoundException::new);

        List<ChatParticipant> findChatParticipants = findChatRoom.getChatParticipants();

        findChatParticipants.forEach(chatParticipantRepository::delete);

        List<Message> messageList = messageRepository.findByChatRoomChatRoomId(chatRoomId);

        if(!messageList.isEmpty()) {
            for(Message message : messageList) {
                messageRepository.delete(message);
            }
        }

        chatRoomRepository.delete(findChatRoom);

        return true;
    }

    public Long createChatReport(ChatReportRequest chatReportRequest) {

        ChatReport chatReport = ChatReport.builder()
                .chatRoom(chatRoomRepository.findById(chatReportRequest.getChatRoomId()).orElseThrow(ChatNotFoundException::new))
                .content(chatReportRequest.getContent())
                .build();

        return chatReportRepository.save(chatReport).getChatReportId();
    }

    public void findChatReport(Long chatReportId) {
        ChatReport chatReport = chatReportRepository.findById(chatReportId).orElseThrow(ChatNotFoundException::new);
    }

    private Member findMemberById(Long memberId) {

        return memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
    }

    private void verifyExistParticipant(Long memberId1, Long memberId2, Long chatRoomId) {

        List<ChatParticipant> chatParticipantsByMember1 = chatParticipantRepository.findByMemberMemberId(memberId1);

        List<ChatParticipant> chatParticipantsByMember2 = chatParticipantRepository.findByMemberMemberId(memberId2);

        boolean checkJoinedSameChatRoom = false;

        for(ChatParticipant chatParticipant1 : chatParticipantsByMember1) {
            Long findChatId = chatParticipant1.getChatRoom().getChatRoomId();

            for(ChatParticipant chatParticipant2 : chatParticipantsByMember2) {
                if(findChatId.equals(chatParticipant2.getChatRoom().getChatRoomId())) {
                    throw new ChatBadRequestException();
                }
            }
        }
    }
}
