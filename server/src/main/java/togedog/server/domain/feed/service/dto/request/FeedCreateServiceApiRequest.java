package togedog.server.domain.feed.service.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
@Builder
public class FeedCreateServiceApiRequest {

    private String title;
    private String content;
    private String address;
    //    private String state;
    private Boolean openYn;
    private Boolean addMap; //
    private List<String> images;
    private String videos;



    //공개,비공개 여부랑, 지도에 등록하기를 나눠서 받자!
}
