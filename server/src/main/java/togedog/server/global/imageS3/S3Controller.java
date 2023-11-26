package togedog.server.global.imageS3;

import com.google.gson.Gson;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

@RestController
@RequestMapping("/s3")
@RequiredArgsConstructor
public class S3Controller {

    private final S3Service s3Service;

    private static final long MAX_FILE_SIZE = 10 * 1024 *1024; // 10MB

    @PostMapping(value = "/feedImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> uploadCoverImage(HttpServletRequest request,
                                                   @RequestParam("feedImage") MultipartFile feedImage) throws IOException {

        if (feedImage.getSize() > MAX_FILE_SIZE) {
            return ResponseEntity
                    .badRequest()
                    .body("10MB 이하 파일을 업로드하세요.");
        }

        String uploadImagePath = s3Service.upload(feedImage,"Storage");

        Gson gson = new Gson();

        String response = gson.toJson(uploadImagePath);

        return ResponseEntity.ok(response);

    }

}
