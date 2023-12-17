//package togedog.server;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.springframework.test.web.servlet.MockMvc;
//import togedog.server.domain.member.controller.MemberController;
//import togedog.server.domain.member.service.MemberService;
//
//@AutoConfigureRestDocs
//@WithMockUser
//@WebMvcTest(MemberController.class)
//public class MemberControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private MailService mailService;
//
//    @MockBean
//    private MemberService memberService;
//
//    @MockBean
//    private MemberMapper mapper;
//
//    @DisplayName("멤버 조회")
//    @Test
//    void getMember() throws Exception {
//        //given
//        MultiValueMap<String , String> info = new LinkedMultiValueMap<>();
//        info.add("par", "안녕하세요");
//
//        //when & then
//        mockMvc.perform(MockMvcRequestBuilders.get("/member")
//                        .contentType(MediaType.APPLICATION_JSON)
//                        .params(info)
//                        .with(SecurityMockMvcRequestPostProcessors.csrf()))
//                .andDo(MockMvcResultHandlers.print())
//                .andDo(MockMvcRestDocumentation.document("member/getMember",
//                        Preprocessors.preprocessRequest(prettyPrint()),
//                        Preprocessors.preprocessResponse(prettyPrint())))
//                .andExpect(MockMvcResultMatchers.status().isOk());
//    }
//
//
//
//}
