package togedog.server.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import org.hibernate.validator.constraints.Length;
import togedog.server.domain.pet.entity.Pet;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.List;

public class MemberDto {

    @Getter
    public static class Post{

        @NotBlank(message = "이메일 필드를 작성해주세요.")
        @Pattern(regexp = "^(?:\\w+\\.?)*\\w+@(?:\\w+\\.)+\\w+$", message = "이메일 형식이 올바르지 않습니다.")
        private String email;

        @NotBlank(message = "닉네임 필드를 작성해주세요.")
        @Pattern(regexp = "^[ㄱ-ㅎ가-힣a-z0-9-_]{2,10}$", message = "닉네임은 특수문자를 제외한 2~10자리여야 합니다.")
        private String nickname;

        @NotBlank(message = "패스워드 필드를 작성해주세요.")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "패스워드는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;

        @NotBlank(message = "패스워드 확인 필드를 작성해주세요.")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "패스워드 확인 필드는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String pwConfirm;

        @NotBlank(message = "약관1을 동의 해주세요.")
        private String agree1;

        @NotBlank(message = "약관2를 동의 해주세요.")
        private String agree2;

    }

    @Getter
    public static class PatchIntro{
        @NotBlank(message = "소개글 필드를 10글자 ~ 1000글자 사이로 작성해주세요.")
        @Length(max = 1000, min = 10)
        private String myIntro;
    }

    @Getter
    public static class PatchNickname{
        @NotBlank(message = "닉네임 필드를 2글자 ~ 30글자 사이로 작성해주세요.")
        @Length(max = 30, min = 2)
        private String nickname;
    }

    @Getter
    public static class PatchPassword{
        @NotBlank(message = "패스워드 필드를 작성해주세요.")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "패스워드는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String password;

        @NotBlank(message = "패스워드 확인 필드를 작성해주세요.")
        @Pattern(regexp = "(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\\W)(?=\\S+$).{8,16}", message = "패스워드 확인 필드는 8~16자 영문 대 소문자, 숫자, 특수문자를 사용하세요.")
        private String pwConfirm;
    }

    @Getter
    @Builder
    public static class ResponseMemberInfo {
        private Long memberId;
        private String email;
        private String nickname;
        private String image;
        private String myIntro;
        private List<Pet> pet;
    }


}
