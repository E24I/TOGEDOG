package togedog.server.global.exception.businessexception.alarmexception;

import org.springframework.http.HttpStatus;

public class AlarmNotFoundException extends AlarmException {

    private static final String MESSAGE = "없거나, 찾을 수 없는 알람 입니다.";

    public static final String CODE = "ALARM-404";

    public AlarmNotFoundException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}
