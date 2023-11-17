package togedog.server.domain.reply.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import togedog.server.domain.reply.repository.ReplyRepository;

@RequiredArgsConstructor
@Service
public class ReplyService {

    private final ReplyRepository replyRepository;
}
