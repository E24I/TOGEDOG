package togedog.server.domain.alarm.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.alarm.entity.Alarm;

import java.util.List;

public interface AlarmRepository extends JpaRepository<Alarm, Long> {

    List<Alarm> findByReceiverMemberId(Long receiverId);
}
