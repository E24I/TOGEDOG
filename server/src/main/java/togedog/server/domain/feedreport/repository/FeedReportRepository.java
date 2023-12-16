package togedog.server.domain.feedreport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.feedreport.entity.FeedReport;
import togedog.server.global.entity.ReportState;

public interface FeedReportRepository extends JpaRepository<FeedReport, Long> {

    Page<FeedReport> findByFeedReportState(Pageable pageable, ReportState reportState);

}
