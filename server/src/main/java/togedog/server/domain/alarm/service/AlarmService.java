package togedog.server.domain.alarm.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import togedog.server.domain.alarm.repository.SseEmitterRepository;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private final Long DEFAULT_TIMEOUT = 60L * 1000 * 60;

    private final SseEmitterRepository sseEmitterRepository;

    public SseEmitter subscribe(Long memberId) {

        SseEmitter sseEmitter = createEmitter(memberId);

        return sseEmitter;
    }

//서버의 이벤트를 클라이언트에게 보내는 메서드
//다른 서비스 로직에서 이 메서드를 사용해 데이터를 Object event에 넣고 전송하면 된다
//@param memberId - 메세지를 전송할 사용자의 아이디
//@param event  - 전송할 이벤트 객체
    public void notify(Long memberId, Object event) {

        sendToClient(memberId, event);
    }

//클라이언트에게 데이터를 전송
//
//@param id   - 데이터를 받을 사용자의 아이디
//@param event - 전송할 이벤트
    private void sendToClient(Long memberId, Object event) {
        SseEmitter sseEmitter = sseEmitterRepository.get(memberId);

        if(sseEmitter != null) {
            try {
                sseEmitter.send(SseEmitter.event().id(String.valueOf(memberId)).name("sse").data(event));
            } catch (IOException ioException) {
                sseEmitterRepository.deleteById(memberId);
                sseEmitter.completeWithError(ioException);
            }
        }
    }

    private SseEmitter createEmitter(Long memberId) {

        SseEmitter sseEmitter = new SseEmitter(DEFAULT_TIMEOUT);

        sseEmitterRepository.save(memberId, sseEmitter);

        sseEmitter.onCompletion(() -> sseEmitterRepository.deleteById(memberId));

        sseEmitter.onTimeout(() -> sseEmitterRepository.deleteById(memberId));

        return sseEmitter;
    }
}
