package togedog.server.domain.alarm.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.alarm.dto.AlarmDto;
import togedog.server.domain.alarm.entity.Alarm;
import togedog.server.domain.alarm.service.AlarmService;

@RestController
@RequestMapping
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmService alarmService;

    @GetMapping("/alarm")
    public ResponseEntity postAlarm(@RequestBody AlarmDto alarmDto) {
        Alarm alarm = Alarm.builder()
                .alarmId(1L)
                .testContent1("alarmDto.getTestContent1()")
                .testContent2("alarmDto.getTestContent2()")
                .build();

        return new ResponseEntity<>(alarmService.createAlarm(alarm), HttpStatus.CREATED);
    }
}
