package togedog.server.domain.feed.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import togedog.server.domain.feedimage.entity.FeedImage;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.feedreport.entity.FeedReport;
import togedog.server.domain.feedbookmark.entity.FeedBookmark;
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
@NoArgsConstructor
@AllArgsConstructor
public class Feed extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedId;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    @Lob
    private String content;

    @Column
    private Integer views = 0;

    @Enumerated(EnumType.STRING)
    private State state;

    private Integer likeCount;

    private Integer bookmarkYn;

    private String address;

    private Boolean replyFix;

    private Integer repliesCount;

    private Boolean openYn;


    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Reply> replies = new ArrayList<>();

    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FeedLike> feedLikes = new ArrayList<>();

    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FeedReport> feedReports = new ArrayList<>();

    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FeedBookmark> feedBookmarks = new ArrayList<>();

    @OneToMany(mappedBy = "feed", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<FeedImage> feedImages = new ArrayList<>(); // 필요 x

    // 알림이 들어와야 할듯?

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;
}
