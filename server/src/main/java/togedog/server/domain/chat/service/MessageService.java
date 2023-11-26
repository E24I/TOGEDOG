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

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    private final MemberRepository memberRepository;

    private final ChatService chatService;

    private final MessageMapper messageMapper;

    public void createMessage(Long roomId, MessageRequest messageRequest) {

        Member findMember = findMemberById(messageRequest.getMemberId());

        ChatRoom findChatRoom = chatService.findChatRoom(roomId);

        Message message = messageMapper.messageRequestToMessage(messageRequest, findMember, findChatRoom);

        messageRepository.save(message);
    }

    private Member findMemberById(Long memberId) {
        //TODO: 예외처리 추가예정
        return memberRepository.findById(memberId).orElseThrow(RuntimeException::new);
    }
}
