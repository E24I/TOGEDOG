package togedog.server.domain.mapcontent.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.mapcontent.dto.MapContentFeedIdResponse;
import togedog.server.domain.mapcontent.dto.MapContentGetRequest;
import togedog.server.domain.mapcontent.dto.MapContentRequest;
import togedog.server.domain.mapcontent.dto.MapContentResponse;
import togedog.server.domain.mapcontent.service.MapContentService;

@RestController
@RequestMapping("/map/content")
@RequiredArgsConstructor
public class MapContentController {

    private final MapContentService mapContentService;

    @PostMapping
    public ResponseEntity<String> postMapContent(@RequestBody MapContentRequest mapContentRequest) {

        Long mapContentId = mapContentService.createMapContent(mapContentRequest);

        return new ResponseEntity<>("MapContentId: " + mapContentId, HttpStatus.CREATED);
    }

    @GetMapping("/{feed-id}")
    public ResponseEntity<MapContentResponse> getMapContent(@PathVariable("feed-id") Long feedId) {

        MapContentResponse response = mapContentService.findMapContent(feedId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/coordinate")
    public ResponseEntity getFeedFromCoordinate(@RequestBody MapContentGetRequest request) {

        MapContentFeedIdResponse response = mapContentService.findFeedFromWsg84(request);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
