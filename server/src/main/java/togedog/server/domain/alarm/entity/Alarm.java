package togedog.server.domain.alarm.entity;

import lombok.Builder;
import lombok.Getter;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Builder
@Getter
public class Alarm extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long alarmId;

    private String testContent1;

    private String testContent2;
}
