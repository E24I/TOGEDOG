package togedog.server.global.auth.utils;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;

import java.util.Optional;

@Slf4j
@AllArgsConstructor
@Component
public class LoginMemberUtil {

    private final MemberRepository memberRepository;

    public Long getLoginMemberId() {

        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String principalEmail = authentication.getPrincipal().toString();
        Optional<Member> optionalMember = memberRepository.findByEmail(principalEmail);

        if(optionalMember.isEmpty()){
            return null;
        }else

        return optionalMember.get().getMemberId();
    }
}
