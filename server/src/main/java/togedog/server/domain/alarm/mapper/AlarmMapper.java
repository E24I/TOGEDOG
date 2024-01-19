package togedog.server.domain.alarm.mapper;

import org.springframework.stereotype.Component;
import togedog.server.domain.alarm.dto.AlarmResponse;
import togedog.server.domain.alarm.entity.Alarm;

import java.util.List;
import java.util.stream.Collectors;

@Component
public class AlarmMapper {

    public List<AlarmResponse> alarmListToResponseList(List<Alarm> alarmList) {

        return alarmList.stream().map(this::alarmToResponse).collect(Collectors.toList());
    }

    public AlarmResponse alarmToResponse(Alarm alarm) {

        if(alarm == null) {
            return null;
        }
        else {
            return AlarmResponse.builder()
                    .alarmId(alarm.getAlarmId())
                    .content(alarm.getContent())
                    .feedId(alarm.getFeedId())
                    .feedThumbnailUrl(alarm.getFeedThumbnailUrl())
                    .replyId(alarm.getReplyId())
                    .commentId(alarm.getCommentId())
                    .senderId(alarm.getSender().getMemberId())
                    .receiverId(alarm.getReceiver().getMemberId())
                    .isRead(alarm.getIsRead())
                    .createdAt(alarm.getCreatedDateTime().toString())
                    .build();
        }
    }
}
