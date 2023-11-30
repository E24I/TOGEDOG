package togedog.server.domain.alarm.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import togedog.server.domain.alarm.service.AlarmService;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping(value = "/alarm/subscribe/{member-id}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter postAlarm(@PathVariable("member-id") Long memberId) {

        return alarmService.subscribe(memberId);
    }

    @PostMapping("/send-data/{member-id}")
    public void sendData(@PathVariable("member-id") Long memberId) {

        System.out.println("요청성공");
        alarmService.notify(memberId, "test data");
    }
}
