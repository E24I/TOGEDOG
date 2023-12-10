package togedog.server.domain.feed.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.domain.feed.service.dto.request.FeedCreateServiceApiRequest;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

@AllArgsConstructor
@Getter
@Builder
@NoArgsConstructor
public class FeedCreateApiRequest {

    @NotBlank(message = "제목은 빈칸으로 입력할 수 없습니다.")
    @Size(min = 2, message = "제목은 2자 이상 입력 해주세요.")
    private String title;

    private String content;

    private String address;

//    private String state;

    private Boolean openYn;

    private Boolean addMap;

    private List<String> images;
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
