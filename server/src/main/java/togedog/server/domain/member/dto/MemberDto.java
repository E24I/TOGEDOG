package togedog.server.domain.member.dto;

import lombok.Data;

@Data
public class MemberPostDto {

    private String email;
    private String nickname;
    private String password;
    private String agree1;
    private String agree2;
}
