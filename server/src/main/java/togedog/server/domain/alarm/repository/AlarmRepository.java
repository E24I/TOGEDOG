package togedog.server.domain.alarm.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.alarm.entity.Alarm;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    Page<Alarm> findByReceiverMemberId(Long receiverId, Pageable pageable);
}
