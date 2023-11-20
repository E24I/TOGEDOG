package togedog.server.domain.mapcontent.entity;

import lombok.Getter;
import lombok.Setter;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class MapContent extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long mapContentId;

    private String coordinate;
}
