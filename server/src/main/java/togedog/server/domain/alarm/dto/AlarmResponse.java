package togedog.server.domain.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.domain.member.entity.Member;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Builder @NoArgsConstructor @AllArgsConstructor
public class AlarmResponse {

    private Long alarmId;

    private String content;

    private String url;

    private Long senderId;

    private Long receiverId;

    private String isRead;
}
