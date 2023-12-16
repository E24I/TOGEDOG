package togedog.server.domain.replyreport.entity;

import lombok.*;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feedreport.entity.FeedReport;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.global.entity.BaseEntity;
import togedog.server.global.entity.ReportState;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Builder
public class ReplyReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyReportId;

    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReportState replyReportState;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "reply_id")
    private Reply reply;


    public static ReplyReport createReplyReport(String content, Member member, Reply reply) {
        return ReplyReport.builder()
                .content(content)
                .member(member)
                .reply(reply)
                .replyReportState(ReportState.PROCEEDING)
                .build();

    }
}
