package togedog.server.domain.alarm.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import togedog.server.domain.alarm.dto.AlarmResponse;
import togedog.server.domain.alarm.service.AlarmService;

import java.util.List;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping(value = "/alarm/subscribe/{member-id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter postAlarm(@PathVariable("member-id") Long memberId) {

        return alarmService.subscribe(memberId);
    }

    //테스트용 API
    @PostMapping("/send-data/{member-id}")
    public void sendData(@PathVariable("member-id") Long memberId) {

        alarmService.notify(memberId, "test data");
    }

    @GetMapping("/alarm")
    public ResponseEntity<List<AlarmResponse>> getAlarm() {

        return ResponseEntity.ok().body(alarmService.findAlarm());
    }

    @DeleteMapping("/alarm/{alarm-id}")
    public ResponseEntity<String> deleteAlarm(@PathVariable("alarm-id") Long alarmId) {

        alarmService.deleteAlarm(alarmId);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("알림 삭제 완료");
    }
}
