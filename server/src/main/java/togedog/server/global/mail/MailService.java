package togedog.server.global.mail;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import togedog.server.global.redis.RedisUtil;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

@Slf4j
@Service
@AllArgsConstructor
public class MailService {

    private final JavaMailSender emailSender; //메일센더선언
    private RedisUtil redisUtil;

    /*
    이메일 보내기 MimeMessage 이용
     */
    public void sendEmail(String toEmail, String title, String text, String authCode) {
        MimeMessage message = emailSender.createMimeMessage();
        try {
            MimeMessageHelper messageHelper = new MimeMessageHelper(message,true,"utf-8");//이메일 메시지와 관련된 설정을 수행합니다.
            // true를 전달하여 multipart 형식의 메시지를 지원하고, "utf-8"을 전달하여 문자 인코딩을 설정
//            helper.setFrom("발신자");//이메일의 발신자 주소 설정 -> EmailConfig에서 설정해줬음.
            messageHelper.setTo(toEmail);//이메일의 수신자 주소 설정
            messageHelper.setSubject(title);//이메일의 제목을 설정
            messageHelper.setText(text,true);//이메일의 내용 설정 두 번째 매개 변수에 true를 설정하여 html 설정으로한다.
            emailSender.send(message);

            redisUtil.setDataExpire(authCode,toEmail, 60 * 2L); //2분후 만료
        } catch (MessagingException e) {//이메일 서버에 연결할 수 없거나, 잘못된 이메일 주소를 사용하거나, 인증 오류가 발생하는 등 오류
            // 이러한 경우 MessagingException이 발생
            throw new RuntimeException(e.getMessage());
        }
    }

    public void sendPasswordCodeToEmail(String toEmail) {
        String title = "Togedog 비밀번호변경 인증 번호입니다.";
        String authCode = this.createCode();
        String text = "본메일은 Togedog 인증 전용 메일입니다." + 	//html 형식으로 작성 !
                "<br><br>" +
                "하단의 6자리숫자가 인증번호입니다. <h3>" + authCode + "</h3>" +
                "<br>" +
                "인증 페이지로 돌아가서 인증코드를 정확히 입력해주세요.";

        this.sendEmail(toEmail, title, text, authCode);
    }


    public void sendCodeToEmail(String toEmail) {

        String title = "Togedog 회원가입 인증 번호입니다.";
        String authCode = this.createCode();
        String text = "본메일은 Togedog 인증 전용 메일입니다." + 	//html 형식으로 작성 !
                "<br><br>" +
                "하단의 6자리숫자가 인증번호입니다. <h3>" + authCode + "</h3>" +
                "<br>" +
                "회원가입 페이지로 돌아가서 인증코드를 정확히 입력해주세요.";

        this.sendEmail(toEmail, title, text, authCode);
    }


    /*
    이메일 인증 코드를 생성
     */
    private String createCode(){
        int length = 6;
        try {
            Random random = SecureRandom.getInstanceStrong();
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < length; i++) {
                builder.append(random.nextInt(10));
            }
            return builder.toString();
        } catch (NoSuchAlgorithmException e) {
            log.debug("MemberService.createCode() exception occur");
            throw new RuntimeException("코드 에러");
        }
    }

    public boolean checkAuthNum(String email, String authNum){
        if(redisUtil.getData(authNum) == null){
            return false;
        } else return redisUtil.getData(authNum).equals(email);
    }

    /*
    간단한 이메일 보내기 SimpleMailMessage 이용
    현재 사용 X
     */
    public void sendSimpleEmail(String toEmail, String title, String text){
        SimpleMailMessage emailForm = createEmailForm(toEmail, title, text);
        try {
            log.info(toEmail);
            log.info(title);
            log.info(text);
            emailSender.send(emailForm);
            redisUtil.setDataExpire(text,toEmail,60*2L); //30분뒤 만료

        } catch (RuntimeException e) {
            log.debug("MailService.sendEmail exception occur toEmail: {}, " +
                    "title: {}, text: {}", toEmail, title, text);
            throw new RuntimeException(e.getMessage());
        }
    }

    private SimpleMailMessage createEmailForm(String toEmail,
                                              String title,
                                              String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(title);
        message.setText(text);

        return message;
    }

}