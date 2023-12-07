package togedog.server.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import togedog.server.global.response.PageInformation;

@Getter
@Builder
@AllArgsConstructor
public class MessagePageResponse<T> {

    private T messages;
    private PageInformation pageInformation;
}
