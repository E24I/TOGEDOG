package togedog.server.domain.mapcontentlike.entity;

import lombok.Getter;
import lombok.Setter;
import org.yaml.snakeyaml.events.Event;
import togedog.server.domain.mapcontent.entity.MapContent;
import togedog.server.domain.member.entity.Member;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class MapContentLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mapContentLike;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "map_content_id")
    private MapContent mapContent;
}
