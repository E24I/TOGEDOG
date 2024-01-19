package togedog.server.domain.alarm.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import togedog.server.domain.alarm.dto.AlarmPageResponse;
import togedog.server.domain.alarm.dto.AlarmResponse;
import togedog.server.domain.alarm.entity.Alarm;
import togedog.server.domain.alarm.mapper.AlarmMapper;
import togedog.server.domain.alarm.repository.AlarmRepository;
import togedog.server.domain.alarm.repository.SseEmitterRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.exception.businessexception.alarmexception.AlarmNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberAccessDeniedException;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AlarmService {

    private static final Long DEFAULT_TIMEOUT = 60L * 1000 * 60; // 1시간(millisecond)

    private final SseEmitterRepository sseEmitterRepository;

    private final AlarmRepository alarmRepository;

    private final LoginMemberUtil loginMemberUtil;

    private final AlarmMapper alarmMapper;

    private final MemberRepository memberRepository;

    public SseEmitter subscribe(Long memberId) {

        SseEmitter sseEmitter = createEmitter(memberId);

        return sseEmitter;
    }

//서버의 이벤트를 클라이언트에게 보내는 메서드
//다른 서비스 로직에서 이 메서드를 사용해 데이터를 Object event에 넣고 전송하면 된다
//@param memberId - 메세지를 전송할 사용자의 아이디
//@param event  - 전송할 이벤트 객체
    public void notify(Long memberId, String message) {

        sendToClient(memberId, message);
    }

//클라이언트에게 데이터를 전송
//
//@param id   - 데이터를 받을 사용자의 아이디
//@param event - 전송할 이벤트
    private void sendToClient(Long memberId, String message) {
        SseEmitter sseEmitter = sseEmitterRepository.get(memberId);

        if(sseEmitter != null) {
            try {
                sseEmitter.send(SseEmitter.event().id(String.valueOf(memberId)).name("sse").data(message));
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

    public AlarmPageResponse findAlarm(int pageNum) {

        Pageable pageable = PageRequest.of(pageNum - 1, 10, Sort.by("createdDateTime").descending());

//        Long loginMemberId = loginMemberUtil.getLoginMemberId();
//        if(loginMemberId == null) {
//            return null;
//        }
        Long loginMemberId = 25L;

        Page<Alarm> alarmList = alarmRepository.findByReceiverMemberId(loginMemberId, pageable);

        return alarmMapper.alarmListToResponseList(alarmList);
    }

    public void deleteAlarm(Long alarmId) {

        Long loginMemberId = loginMemberUtil.getLoginMemberId();
        Alarm alarm = alarmRepository.findById(alarmId).orElseThrow(AlarmNotFoundException::new);
        if(!loginMemberId.equals(alarm.getReceiver().getMemberId())) {
            throw new MemberAccessDeniedException();
        }

        alarmRepository.delete(alarm);
    }
}
