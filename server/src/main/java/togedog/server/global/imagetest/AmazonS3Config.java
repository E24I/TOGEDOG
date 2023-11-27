package togedog.server.global.imagetest;

//import com.amazonaws.auth.AWSStaticCredentialsProvider;
//import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.services.s3.AmazonS3;
//import com.amazonaws.services.s3.AmazonS3ClientBuilder;
//import org.springframework.context.annotation.Bean;
import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AmazonS3Config {

    private String accessKey = "AKIAS6GKCXMUCZ3OVHJD";
    private String secretKey = "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";
    private String clientRegion = "ap-northeast-2";
    private String bucketName = "togedog-image";

    @Bean
    public AmazonS3 amazonS3() {
        BasicAWSCredentials awsCredentials = new BasicAWSCredentials(accessKey, secretKey);
        return AmazonS3ClientBuilder.standard()
                .withCredentials(new AWSStaticCredentialsProvider(awsCredentials))
                .withRegion(clientRegion)
                .build();
    }

    public String getBucketName() {
        return this.bucketName;
    }
}
