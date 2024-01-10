package togedog.server.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.domain.chat.entity.ChatRoom;
import togedog.server.global.entity.ReportState;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatReportResponse {

    private Long chatReportId;

    private Long chatRoomId;

    private Long reportedMemberId;

    private String content;

    private String reportState;
}
