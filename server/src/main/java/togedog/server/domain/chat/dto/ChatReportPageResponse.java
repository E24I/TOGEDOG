package togedog.server.domain.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.global.response.PageInformation;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChatReportPageResponse<T> {

    private T reports;
    private PageInformation pageInformation;
}
