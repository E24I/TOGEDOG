package togedog.server.domain.chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.chat.entity.ChatReport;

public interface ChatReportRepository extends JpaRepository<ChatReport, Long> {
}
