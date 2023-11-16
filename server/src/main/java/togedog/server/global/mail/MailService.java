package togedog.server.global.mail;

import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.thymeleaf.spring5.SpringTemplateEngine;
import togedog.server.global.redis.RedisUtil;

import javax.mail.internet.MimeMessage;
import javax.transaction.Transactional;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.Random;

@Slf4j
@Service
@AllArgsConstructor
public class MailService {

    private final JavaMailSender emailSender; //메일센더
    private RedisUtil redisUtil;

    public void sendEmail(String toEmail,
                          String title,
                          String text) {
        SimpleMailMessage emailForm = createEmailForm(toEmail, title, text);
        try {
            log.info(toEmail);
            log.info(title);
            log.info(text);
            emailSender.send(emailForm);
            redisUtil.setDataExpire(text,toEmail,60*5L);

        } catch (RuntimeException e) {
            log.debug("MailService.sendEmail exception occur toEmail: {}, " +
                    "title: {}, text: {}", toEmail, title, text);
            throw new RuntimeException(e.getMessage());
        }
    }

    public void sendCodeToEmail(String toEmail) {
        this.checkDuplicatedEmail(toEmail);
        String title = "Togedog email 인증 번호입니다.";
        String authCode = this.createCode();
        this.sendEmail(toEmail, title, authCode);
    }

    private void checkDuplicatedEmail(String email) {

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


    private SimpleMailMessage createEmailForm(String toEmail,
                                              String title,
                                              String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(title);
        message.setText(text);

        return message;
    }

    public boolean checkAuthNum(String email, String authNum){
        if(redisUtil.getData(authNum) == null){
            return false;
        } else return redisUtil.getData(authNum).equals(email);
    }
}