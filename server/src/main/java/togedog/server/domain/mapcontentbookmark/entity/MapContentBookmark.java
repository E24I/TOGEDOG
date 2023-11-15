package togedog.server.domain.mapcontentbookmark.entity;

import lombok.Getter;
import lombok.Setter;
import togedog.server.domain.mapcontent.entity.MapContent;
import togedog.server.domain.member.entity.Member;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class MapContentBookmark {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mapContentBookmarkId;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "map_content_id")
    private MapContent mapContent;
}
