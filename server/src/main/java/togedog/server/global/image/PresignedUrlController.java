package togedog.server.global.image;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/presigned-url")
@Slf4j
@RequiredArgsConstructor
public class PresignedUrlController {

    private final PresignedUrlService presignedUrlService;

    @PostMapping()
    public ResponseEntity<String> generatePresignedUrl(@RequestBody ImageNameDTO imageNameDTO) {
        String generatedUrl = presignedUrlService.getPreSignedUrl("", imageNameDTO.getImageName());
        return ResponseEntity.ok(generatedUrl);
    }
}
