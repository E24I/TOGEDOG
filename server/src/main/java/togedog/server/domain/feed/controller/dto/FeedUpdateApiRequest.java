package togedog.server.domain.feed.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.domain.feed.service.dto.request.FeedUpdateServiceRequest;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@AllArgsConstructor
@Getter
@Builder
@NoArgsConstructor
public class FeedUpdateApiRequest {

    @NotBlank(message = "제목은 빈칸으로 입력할 수 없습니다.")
    @Size(min = 2, message = "제목은 2자 이상 입력 해주세요.")
    private String title;

    private String content;

    private Boolean openYn;


    public FeedUpdateServiceRequest toFeedUpdateServiceRequest() {
        return FeedUpdateServiceRequest.builder()
                .title(title)
                .content(content)
                .openYn(openYn)
                .build();

    }
}
