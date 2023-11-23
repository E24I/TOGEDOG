package togedog.server.global.entity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum TypeEnum implements BaseEnum{
    UPVOTE("추천"),
    DOWNVOTE("비추천");


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