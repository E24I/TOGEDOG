package togedog.server.domain.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togedog.server.domain.chat.dto.MessagePageResponse;
import togedog.server.domain.chat.dto.MessageRequest;
import togedog.server.domain.chat.dto.MessageResponse;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.domain.chat.entity.Message;
import togedog.server.domain.chat.mapper.MessageMapper;
import togedog.server.domain.chat.repository.ChatRoomRepository;
import togedog.server.domain.chat.repository.MessageRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.exception.businessexception.chatexception.ChatNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    private final MemberRepository memberRepository;

    private final ChatRoomRepository chatRoomRepository;

    private final MessageMapper messageMapper;

    @Transactional
    public MessageResponse createMessage(Long roomId, MessageRequest messageRequest) {

        Member findMember = findMemberById(messageRequest.getMemberId());

        ChatRoom findChatRoom = chatRoomRepository.findById(roomId).orElseThrow(ChatNotFoundException::new);;

        findChatRoom.setLatestMessage(messageRequest.getContent());

        Message message = messageMapper.messageRequestToMessage(messageRequest, findMember, findChatRoom);

        Message savedMessage = messageRepository.save(message);

        MessageResponse messageResponse = messageMapper.messageToMessageResponse(savedMessage);

        return messageResponse;
    }

    private Member findMemberById(Long memberId) {

        return memberRepository.findById(memberId).orElseThrow(MemberNotFoundException::new);
    }

    public MessagePageResponse findMessages(Long chatRoomId, int pageNumber, int pageSize) {

        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize, Sort.by("createdDateTime").descending());

        Page<Message> messages = messageRepository.findByChatRoomChatRoomId(chatRoomId, pageable);

        return messageMapper.messagePageToMessagePageResponses(messages);
    }
}
