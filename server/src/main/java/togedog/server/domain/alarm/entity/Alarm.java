package togedog.server.domain.alarm.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.domain.member.entity.Member;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@Builder @NoArgsConstructor @AllArgsConstructor
public class Alarm extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmId;

    private String content;

    private Long feedId;

    private String feedThumbnailUrl;

    private Long replyId;

    private Long commentId;

    @ManyToOne
    @JoinColumn(name = "sender_id")
    private Member sender;

    @ManyToOne
    @JoinColumn(name = "receiver_id")
    private Member receiver;

    @Builder.Default
    private String isRead = "N";
}
