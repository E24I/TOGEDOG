package togedog.server.domain.mapcontent.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
public class MapContent extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mapContentId;

    private String wsg84x;

    private String wsg84y;

    @OneToMany(mappedBy = "mapContent")
    private List<Feed> feeds = new ArrayList<>();

    MapContent() {
    }
}
