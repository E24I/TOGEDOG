package togedog.server.domain.feed.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
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
@Builder
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

    @Column(nullable = false)
    private String images;

    @Column(nullable = false)
    private String videos;

    private Integer views = 0;



//    @Enumerated(EnumType.STRING)
//    private State state;

    private Integer likeCount = 0;

    private boolean bookmarkYn;

    private String address;

    private Boolean replyFix;

    private Integer repliesCount;

    private Boolean openYn; // 공개 비공개 여부

    private Boolean addMap; // 지도 등록 여부

    private boolean deleteYn; //삭제 여부


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

    public static Feed createFeed(String title, String content, String address,
                                  Boolean openYn, Boolean addMap,String images,
                                  String videos, Member member) {
        return Feed.builder()
                .title(title)
                .content(content)
                .address(address)
                .openYn(openYn)
                .addMap(addMap)
                .images(images)
                .videos(videos)
                .member(member)
                .deleteYn(false)
                .build();
    }

    public void updateMyFeed(String title, String content, Boolean openYn) {
        if (title != null) {
            this.title = title;
        }
        if (content != null) {
            this.content = content;
        }
        this.openYn = openYn; // 이건 널값 안들어오고, 원래 값이 들어올 경우 그 값 유지하게 하는 방식으로 다시 짜자!
    }

    public void deleteMyFeed() {
        this.deleteYn = true;

    }



}
