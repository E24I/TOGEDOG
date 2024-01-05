package togedog.server.domain.mapcontent.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import togedog.server.domain.mapcontent.entity.MapContent;

import java.util.List;
import java.util.Optional;

public interface MapContentRepository extends JpaRepository<MapContent, Long> {

    //Optional<MapContent> findByWgs84xAndWgs84y(Double wgs84_x, Double wgs84_y);

    @Query("SELECT mc FROM MapContent mc WHERE mc.wgs84x >= :thresholdXMin AND mc.wgs84x <= :thresholdXMax AND mc.wgs84y <= :thresholdYMax AND mc.wgs84y >= :thresholdYMin")
    List<MapContent> findMapContentByThreshold(@Param("thresholdXMin") Double thresholdXMin, @Param("thresholdXMax") Double thresholdXMax, @Param("thresholdYMin") Double thresholdYMin, @Param("thresholdYMax") Double thresholdYMax);
}
