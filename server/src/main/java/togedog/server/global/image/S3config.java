package togedog.server.global.image;

import io.lettuce.core.dynamic.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class S3config {

//    @Value("${cloud.aws.credentials.access-key}")
//    private String accessKey;
//
//    @Value("${cloud.aws.credentials.secret-key}")
//    private String secretKey;
//
//    @Value("${cloud.aws.region.static}")
//    private String region;
//    @Bean
//    @Primary
//    public BasicAWSCredentials awsCredentialsProvider(){
//        return new BasicAWSCredentials(accessKey, secretKey);
//    }
//
//    @Bean
//    public AmazonS3 amazonS3Client() {
//        return AmazonS3ClientBuilder.standard()
//                .withRegion(region)
//                .withCredentials(new AWSStaticCredentialsProvider(awsCredentialsProvider()))
//                .build();
//    }
}
