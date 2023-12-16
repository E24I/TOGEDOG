package togedog.server.domain.feedreport.entity;

import lombok.*;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.member.entity.Member;
import togedog.server.global.entity.BaseEntity;
import togedog.server.global.entity.ReportState;

import javax.persistence.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FeedReport extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedReportId;

    @Column(nullable = false)
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReportState feedReportState;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;


    public static FeedReport CreateFeedReport(String content, Member member, Feed feed) {

        return FeedReport.builder()
                .content(content)
                .member(member)
                .feedReportState(ReportState.PROCEEDING)
                .feed(feed)
                .build();
    }



}
