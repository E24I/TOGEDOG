package togedog.server.domain.feed.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.domain.feed.service.dto.request.FeedCreateServiceApiRequest;

@AllArgsConstructor
@Getter
@Builder
@NoArgsConstructor
public class FeedCreateApiRequest {

    private String title;

    private String content;

    private String address;

//    private String state;

    private Boolean openYn;

    private Boolean addMap;

    private String images;
    private String videos;

    //공개,비공개 여부랑, 지도에 등록하기를 나눠서 받자!

    public FeedCreateServiceApiRequest toFeedCreateServiceRequest() { // 빌더패턴의 체이닝메스드로 this 안써도 된다.
        return FeedCreateServiceApiRequest.builder()
                .title(title)
                .content(content)
                .address(address)
                .openYn(openYn)
                .addMap(addMap)
                .images(images)
                .videos(videos)
                .build();
    }
}
