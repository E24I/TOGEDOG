package togedog.server.global.entity;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum ReportState implements BaseEnum {

    COMPLETE("처리 완료"),
    PROCEEDING("처리중");

    private final String description;

    @Override
    public String getName() {
        return name();
    }

    @Override
    public String getDescription() {
        return this.description;
    }
}
