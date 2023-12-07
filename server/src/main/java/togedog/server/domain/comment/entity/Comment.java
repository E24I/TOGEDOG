package togedog.server.domain.comment.entity;

import lombok.*;
import togedog.server.domain.commentreport.entity.CommentReport;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feedreport.entity.FeedReport;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.global.entity.BaseEntity;
import togedog.server.global.entity.State;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Comment extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private String content;

    @Enumerated(EnumType.STRING)
    private State state;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "reply_id")
    private Reply reply;

    @OneToMany(mappedBy = "comment", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CommentReport> commentReports = new ArrayList<>();


    public static Comment createComment(String content, Reply reply, Member member) {
        return Comment.builder()
                .content(content)
                .member(member)
                .reply(reply)
                .build();


    }
}
