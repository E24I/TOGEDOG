package togedog.server.domain.commentreport.entity;

import lombok.*;
import togedog.server.domain.comment.entity.Comment;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.member.entity.Member;
import togedog.server.global.entity.BaseEntity;
import togedog.server.global.entity.ReportState;

import javax.persistence.*;

@Entity
@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CommentReport extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentReportId;

    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ReportState commentReportState;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "comment_id")
    private Comment comment;


    public static CommentReport createCommentReport(String content, Member member, Comment comment) {
        return CommentReport.builder()
                .content(content)
                .member(member)
                .comment(comment)
                .commentReportState(ReportState.PROCEEDING)
                .build();

    }
}
