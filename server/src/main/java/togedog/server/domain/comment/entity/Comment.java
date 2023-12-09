package togedog.server.domain.comment.entity;

import lombok.*;
import togedog.server.domain.commentreport.entity.CommentReport;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feedreport.entity.FeedReport;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.reply.entity.Reply;
import togedog.server.global.entity.BaseEntity;
import togedog.server.global.entity.State;
import togedog.server.global.exception.businessexception.commentexception.CommentAlreadyDeleteException;

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

    private Boolean deleteYn;

//    @Enumerated(EnumType.STRING)
//    private State state;

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
                .deleteYn(false)
                .member(member)
                .reply(reply)
                .build();
    }

    public void updateNewContent(String content) {
        if (content != null) {
            this.content = content;
        }
    }

    public void deleteMyComment() {
        if(this.deleteYn == false) {
        this.deleteYn = true;
        } else throw new CommentAlreadyDeleteException();
    }
}
