package togedog.server.global.mail.dto;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;

@Data
public class EmailCheckDto {
    @Email
    @NotEmpty(message = "이메일을 입력해주세요")
    private String email;

    @NotEmpty(message = "인증번호를 입력해주세요")
    private String authNum;
}
