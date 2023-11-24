package togedog.server.domain.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togedog.server.domain.chat.dto.ChatPostRequest;
import togedog.server.domain.chat.entity.ChatParticipant;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.chat.mapper.ChatMapper;
import togedog.server.domain.chat.repository.ChatParticipantRepository;
import togedog.server.domain.chat.repository.ChatRoomRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.exception.businessexception.chatexception.ChatNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {

    private final ChatRoomRepository chatRoomRepository;

    private final MemberRepository memberRepository;

    private final ChatParticipantRepository chatParticipantRepository;

    private final ChatMapper chatMapper;

    //TODO: Member Service에 findMember 메서드 작성 시 주석 해제 예정
    public void createChatRoom(ChatPostRequest chatPostRequest) {

        Member requestMember = findMemberById(chatPostRequest.getRequestMemberId());
        Member inviteMember = findMemberById(chatPostRequest.getInviteMemberId());

        ChatRoom chatRoom = new ChatRoom();
        chatRoom = chatRoomRepository.save(chatRoom);

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

    private Member findMemberById(Long memberId) {

        return memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
    }
}
