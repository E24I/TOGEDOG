package togedog.server.domain.chat.dto;


import lombok.Getter;

@Getter
public class ChatReportRequest {

    private Long memberId;

    private Long chatRoomId;

    private String content;
}
