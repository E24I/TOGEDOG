package togedog.server.domain.mapcontent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.mapcontent.entity.MapContent;

public interface MapContentRepository extends JpaRepository<MapContent, Long> {
}
