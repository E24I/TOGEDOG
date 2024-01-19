package togedog.server.domain.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.global.response.PageInformation;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AlarmPageResponse {

    private List<AlarmResponse> alarmResponses;

    private PageInformation pageInformation;
}
