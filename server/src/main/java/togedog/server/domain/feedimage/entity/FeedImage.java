package togedog.server.domain.feedimage.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class FeedImage extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedImageId;
    @Column
    private String feedImageUrl;

    @ManyToOne
    @JoinColumn(name = "feed_id")
    private Feed feed;





}
