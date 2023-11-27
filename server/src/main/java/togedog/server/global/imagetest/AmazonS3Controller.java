package togedog.server.global.imagetest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.Serializable;
import java.util.Map;

@RestController
@RequestMapping("/s3")
public class AmazonS3Controller {

//    private final AmazonS3TestService amazonS3TestService;
//
//    @Autowired
//    public AmazonS3Controller(AmazonS3TestService amazonS3TestService) {
//        this.amazonS3TestService = amazonS3TestService;
//    }
//
//    @GetMapping("/presigned-url/{fileName}")
//    public Map<String, Serializable> getPreSignedUrl(@PathVariable String fileName) {
//        return amazonS3TestService.getPreSignedUrl(fileName);
//    }
}
