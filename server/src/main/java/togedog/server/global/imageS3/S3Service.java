package togedog.server.global.imageS3;

//import com.amazonaws.services.s3.AmazonS3Client;
//import com.amazonaws.services.s3.model.CannedAccessControlList;
//import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

//@RequiredArgsConstructor
//@Service
//@Slf4j
public class S3Service {

//    private final AmazonS3Client amazonS3Client;
//
////    @Value("${cloud.aws.s3.bucket}")
//    private String bucket;
//
//    // MultipartFile을 전달받아 File로 전환한 후 S3에 업로드
//    public String upload(MultipartFile multipartFile, String dirName) throws IOException {
//        File uploadFile = convert(multipartFile)
//                .orElseThrow(() -> new IllegalArgumentException("MultipartFile -> File 전환 실패"));
//        return upload(uploadFile, dirName);
//    }
//
//    private String upload(File uploadFile, String dirName) {
//
//        String subfix = uploadFile.getName().substring(uploadFile.getName().lastIndexOf('.')+1);
//        String UUIDName = UUID.randomUUID().toString();
//        String randomName = UUIDName+"."+subfix;
//
//        String fileName = dirName + "/" + randomName;
//
//        //https://s3.amazonaws.com/togedog-image/storage/filename(여기랜덤부여)+1.jpg
//        //                        / 버킷 이름     /폴더    / 랜덤아이디
//        // string : image
//        String uploadImageUrl = putS3(uploadFile, fileName);
//
//
//        removeNewFile(uploadFile);  // 로컬에 생성된 File 삭제 (MultipartFile -> File 전환 하며 로컬에 파일 생성됨)
//
//        return uploadImageUrl;      // 업로드된 파일의 S3 URL 주소 반환
//    }
//
//    private String putS3(File uploadFile, String fileName) {
//        amazonS3Client.putObject(
//                new PutObjectRequest(bucket, fileName, uploadFile)
//                        .withCannedAcl(CannedAccessControlList.PublicRead)	// PublicRead 권한으로 업로드 됨
//        );
//        return amazonS3Client.getUrl(bucket, fileName).toString();
//    }
//
//    private void removeNewFile(File targetFile) {
//        if(targetFile.delete()) {
//            log.info("파일이 삭제되었습니다.");
//        }else {
//            log.info("파일이 삭제되지 못했습니다.");
//        }
//    }
//
//    private Optional<File> convert(MultipartFile file) throws  IOException {
//        File convertFile = new File(file.getOriginalFilename());
//        if(convertFile.createNewFile()) {
//            try (FileOutputStream fos = new FileOutputStream(convertFile)) {
//                fos.write(file.getBytes());
//            }
//            return Optional.of(convertFile);
//        }
//        return Optional.empty();
//    }

}

