package togedog.server;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.operation.preprocess.Preprocessors;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import togedog.server.domain.alarm.controller.AlarmController;
import togedog.server.domain.alarm.dto.AlarmDto;
import togedog.server.domain.alarm.entity.Alarm;
import togedog.server.domain.alarm.service.AlarmService;
import org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.prettyPrint;

@AutoConfigureRestDocs
@WithMockUser
@WebMvcTest(AlarmController.class)
public class AlarmControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AlarmService alarmService;

    @DisplayName("알람 생성")
    @Test
    void createAlarm() throws Exception {
        //given
        AlarmDto alarmDto = new AlarmDto("test12", "test22");
        Alarm alarm = Alarm.builder()
                .alarmId(1L)
                .testContent1("test1")
                .testContent2("test2")
                .build();

        given(alarmService.createAlarm(any(Alarm.class)))
                .willReturn(alarm);

        //when & then
        mockMvc.perform(MockMvcRequestBuilders.get("/alarm")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(alarmDto))
                        .with(SecurityMockMvcRequestPostProcessors.csrf()))
                .andDo(MockMvcResultHandlers.print())
                .andDo(MockMvcRestDocumentation.document("alarm/postAlarm",
                        Preprocessors.preprocessRequest(prettyPrint()),
                        Preprocessors.preprocessResponse(prettyPrint())))
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }
}
