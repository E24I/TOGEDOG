package togedog.server.domain.alarm.service;

import org.springframework.stereotype.Service;
import togedog.server.domain.alarm.entity.Alarm;

@Service
public class AlarmService {

    public Alarm createAlarm(Alarm alarm) {

        return Alarm.builder().alarmId(1L).testContent1("111").testContent2("222").build();
    }
}
