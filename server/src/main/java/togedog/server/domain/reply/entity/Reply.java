package togedog.server.domain.reply.entity;

import lombok.*;
import togedog.server.domain.comment.entity.Comment;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feedreport.entity.FeedReport;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.replylike.entity.ReplyLike;
import togedog.server.domain.replyreport.entity.ReplyReport;
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
public class Reply extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long replyId;

    @Column(nullable = false)
    private String content;

    private Integer replyLike = 0;

    @Enumerated(EnumType.STRING)
    private State state;

    private Boolean fix;

    private Boolean deleteYn;

    private Integer likeCount;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;

    @OneToMany(mappedBy = "reply", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReplyReport> replyReports = new ArrayList<>();

    @OneToMany(mappedBy = "reply", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();

    @OneToMany(mappedBy = "reply", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ReplyLike> replyLikes = new ArrayList<>();


    public static Reply crateReply(String content, Boolean fix, Member member, Feed feed) {
        return Reply.builder()
                .content(content)
                .fix(fix)
                .feed(feed)
                .member(member)
                .deleteYn(false)
                .build();
    }

    public void updateMyReply(String content) {
        this.content = content;
    }

    public void deleteMyReply() {
        this.deleteYn = true;
    }


}
