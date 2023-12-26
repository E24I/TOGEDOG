//package togedog.server.feed;

import com.google.gson.Gson;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.web.servlet.MockMvc;
import togedog.server.domain.feed.controller.FeedController;
import togedog.server.domain.feed.service.FeedService;
import togedog.server.domain.member.entity.Member;

import static org.junit.jupiter.api.Assertions.*;

//@WebMvcTest(FeedController.class)
//@MockBean(JpaMetamodelMappingContext.class)
//@AutoConfigureRestDocs
//public class FeedControllerTest {

//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private FeedService feedService;
//
//    @Autowired
//    private Gson gson;
//
//    @Test
//    void getFeeds() {
//    }
//
//    @Test
//    void getRepliesByFeedId() {
//    }
//
//    @Test
//    @DisplayName("피드 등록 api ")
//    void postFeed() {
//    }
//
//    @Test
//    void updateFeed() {
//    }
//
//    @Test
//    void deleteFeed() {
//    }
//
//    @Test
//    void deleteFeedByReport() {
//    }
//
//    @Test
//    void likeFeed() {
//    }
//
//    @Test
//    void bookmarkFeed() {
//    }
//
//    @Test
//    void postReply() {
//    }
//
//    @Test
//    void reportFeed() {
//    }
//
//    @Test
//    void reportFeedGet() {
//    }
//
//    @Test
//    void reportUpdate() {
//    }
//}