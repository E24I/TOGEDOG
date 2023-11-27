package togedog.server.domain.alarm.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Repository
@RequiredArgsConstructor
public class SseEmitterRepository {

    private final Map<Long, SseEmitter> emitterMap = new ConcurrentHashMap<>();

    public void save(Long memberId, SseEmitter sseEmitter) {
        emitterMap.put(memberId, sseEmitter);
    }

    public void deleteById(Long memberId) {
        emitterMap.remove(memberId);
    }

    public SseEmitter get(Long memberId) {
        return emitterMap.get(memberId);
    }
}
