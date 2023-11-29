package togedog.server.global.imageS3x;

//@RestController
//@RequestMapping("/s3")
//@RequiredArgsConstructor
public class S3Controller {

//    private final S3Service s3Service;
//
//    private static final long MAX_FILE_SIZE = 10 * 1024 *1024; // 10MB
//
//    @PostMapping(value = "/feedImage", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
//    public ResponseEntity<String> uploadCoverImage(HttpServletRequest request,
//                                                   @RequestParam("feedImage") MultipartFile feedImage) throws IOException {
//
//        if (feedImage.getSize() > MAX_FILE_SIZE) {
//            return ResponseEntity
//                    .badRequest()
//                    .body("10MB 이하 파일을 업로드하세요.");
//        }
//
//        String uploadImagePath = s3Service.upload(feedImage,"Storage");
//
//        Gson gson = new Gson();
//
//        String response = gson.toJson(uploadImagePath);
//
//        return ResponseEntity.ok(response);
//
//    }

}
