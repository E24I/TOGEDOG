package togedog.server.domain.commentreport.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.commentreport.entity.CommentReport;
import togedog.server.domain.replyreport.entity.ReplyReport;
import togedog.server.global.entity.ReportState;

public interface CommentReportRepository extends JpaRepository<CommentReport,Long> {

    Page<CommentReport> findByCommentReportState(Pageable pageable, ReportState CommentreportState);
}
