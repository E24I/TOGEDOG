package togedog.server.domain.mapcontent.entity;

import lombok.Getter;
import lombok.Setter;
import togedog.server.domain.mapcontentbookmark.entity.MapContentBookmark;
import togedog.server.domain.mapcontentlike.entity.MapContentLike;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class MapContent extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mapContentId;

    private String contentId;

    @OneToMany(mappedBy = "mapContent")
    private List<MapContentLike> mapContentLikes = new ArrayList<>();

    @OneToMany(mappedBy = "mapContent")
    private List<MapContentBookmark> mapContentBookmarks = new ArrayList<>();
}
