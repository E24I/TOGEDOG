package togedog.server.domain.replyreport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.feedreport.entity.FeedReport;
import togedog.server.domain.replyreport.entity.ReplyReport;
import togedog.server.global.entity.ReportState;

public interface ReplyReportRepository extends JpaRepository<ReplyReport,Long> {

    Page<ReplyReport> findByReplyReportState(Pageable pageable, ReportState reportState);

}
