package togedog.server.global.imagetest;


import com.amazonaws.HttpMethod;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.Headers;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.GeneratePresignedUrlRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.net.URL;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class AmazonS3TestService {

    private final AmazonS3Config amazonS3Config;

    @Autowired
    public AmazonS3TestService(AmazonS3Config amazonS3Config) {
        this.amazonS3Config = amazonS3Config;
    }

    public Map<String, Serializable> getPreSignedUrl(String fileName) {
        String encodedFileName = fileName + "_" + LocalDateTime.now();
        String objectKey = "test/" + encodedFileName;

        Date expiration = new Date();
        long expTimeMillis = expiration.getTime();
        expTimeMillis += (3 * 60 * 1000); // 3분
        expiration.setTime(expTimeMillis); // URL 만료 시간 설정

        GeneratePresignedUrlRequest generatePresignedUrlRequest =
                new GeneratePresignedUrlRequest(amazonS3Config.getBucketName(), objectKey)
                        .withMethod(HttpMethod.PUT)
                        .withExpiration(expiration);

        AmazonS3 amazonS3 = amazonS3Config.amazonS3();
        String preSignedUrl = amazonS3.generatePresignedUrl(generatePresignedUrlRequest).toString();

        Map<String, Serializable> resultMap = new HashMap<>();
        resultMap.put("preSignedUrl", preSignedUrl);
        resultMap.put("encodedFileName", encodedFileName);

        return resultMap;
    }

}
