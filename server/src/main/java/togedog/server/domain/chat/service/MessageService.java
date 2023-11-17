package togedog.server.domain.chat.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import togedog.server.domain.chat.entity.Message;
import togedog.server.domain.chat.repository.MessageRepository;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {

    private final MessageRepository messageRepository;

    public Message createMessage(Message message) {

        return messageRepository.save(message);
    }
}
