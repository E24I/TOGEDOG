package togedog.server.global.entity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum State implements BaseEnum {

    OPEN("공개"),
    CLOSE("비공개"),
    DELETE("삭제"),
    REPORT("신고");

    private final String stepDescription;

    @Override
    public String getName() {
        return name();
    }

    @Override
    public String getDescription() {
        return this.stepDescription;
    }

}

