package togedog.server.domain.feed.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.feed.controller.dto.FeedCreateApiRequest;
import togedog.server.domain.feed.service.FeedService;

import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/feeds")
@Validated
@RequiredArgsConstructor
public class FeedController {

    private FeedService feedService;


    @GetMapping("/")
    public ResponseEntity<Void> getFeeds() {
        return null;
    }

    @PostMapping
    public ResponseEntity postFeed(@Valid @RequestBody FeedCreateApiRequest request) {



        URI uri = URI.create("/Feeds" ); // + feedId

        return ResponseEntity.created(uri).build();
    }
}
