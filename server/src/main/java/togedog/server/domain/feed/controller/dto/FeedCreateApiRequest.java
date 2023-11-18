package togedog.server.domain.feed.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import togedog.server.domain.feed.service.dto.request.FeedCreateServiceApiRequest;

@AllArgsConstructor
@Getter
@Builder
public class FeedCreateApiRequest {

    private String title;

    private String content;

    private String address;

    private String state;

    //공개,비공개 여부랑, 지도에 등록하기를 나눠서 받자!

    public FeedCreateServiceApiRequest toFeedCreateServiceRequest() {
        return FeedCreateServiceApiRequest.builder()
                .title(this.title)
                .content(this.content)
                .address(this.address)
                .state(this.state)
                .build();
    }
}
