package togedog.server.global.auth.dto;

import lombok.Getter;
import lombok.Setter;
import togedog.server.domain.member.entity.Member;

@Getter
@Setter
public class MemberProfile {

    private String nickname;
    private String email;

    public Member toMember(){
        return new Member(this.email, this.nickname, null);
    }

}
