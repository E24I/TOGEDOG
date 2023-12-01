package togedog.server.domain.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togedog.server.domain.chat.dto.ChatPostRequest;
import togedog.server.domain.chat.dto.ChatRoomResponse;
import togedog.server.domain.chat.entity.ChatParticipant;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.chat.mapper.ChatMapper;
import togedog.server.domain.chat.repository.ChatParticipantRepository;
import togedog.server.domain.chat.repository.ChatRoomRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.exception.businessexception.chatexception.ChatNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;

    private final MemberRepository memberRepository;

    private final ChatParticipantRepository chatParticipantRepository;

    private final ChatMapper chatMapper;

    @Transactional
    public void createChatRoom(ChatPostRequest chatPostRequest) {

        Member requestMember = findMemberById(chatPostRequest.getRequestMemberId());
        Member inviteMember = findMemberById(chatPostRequest.getInviteMemberId());

        ChatRoom chatRoom = new ChatRoom();
        chatRoom = chatRoomRepository.save(chatRoom);

        //참가자가 같은 방이 존재하면 Exception 발생
        verifyExistParticipant(requestMember.getMemberId(), chatRoom.getChatRoomId());
        verifyExistParticipant(inviteMember.getMemberId(), chatRoom.getChatRoomId());

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
    }

    public ChatRoom findChatRoom(Long chatRoomId) {

        return chatRoomRepository.findById(chatRoomId).orElseThrow(ChatNotFoundException::new);
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

    private Member findMemberById(Long memberId) {

        return memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
    }

    private void verifyExistParticipant(Long memberId, Long chatRoomId) {

        if(chatParticipantRepository.findByMemberMemberIdAndChatRoomChatRoomId(memberId, chatRoomId).isEmpty()) {
            throw new ChatNotFoundException();
        }
    }
}
