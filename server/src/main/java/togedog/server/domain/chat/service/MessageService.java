package togedog.server.domain.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togedog.server.domain.chat.dto.MessageRequest;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.chat.entity.Message;
import togedog.server.domain.chat.mapper.MessageMapper;
import togedog.server.domain.chat.repository.MessageRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    private final MemberRepository memberRepository;

    private final ChatService chatService;

    private final MessageMapper messageMapper;

    public Long createMessage(Long roomId, MessageRequest messageRequest) {

        Member findMember = findMemberById(messageRequest.getMemberId());

        ChatRoom findChatRoom = chatService.findChatRoom(roomId);

        Message message = messageMapper.messageRequestToMessage(messageRequest, findMember, findChatRoom);

        return messageRepository.save(message).getMessageId();
    }

    private Member findMemberById(Long memberId) {

        return memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
    }
}
