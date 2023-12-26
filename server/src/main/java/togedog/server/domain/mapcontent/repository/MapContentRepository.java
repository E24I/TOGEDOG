package togedog.server.domain.mapcontent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.mapcontent.entity.MapContent;

import java.util.Optional;

public interface MapContentRepository extends JpaRepository<MapContent, Long> {

    Optional<MapContent> findByWsg84xAndWsg84y(String wsg84_x, String wsg84_y);
}
