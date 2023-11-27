package togedog.server.global.auth.details;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.auth.utils.CustomAuthorityUtils;
import togedog.server.global.exception.businessexception.BusinessException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

/*
Custom UserDetails 사용
UserRole을 DB에서 조회한후 HelloAuthorityUtils로 securiy에게 Role 정보를 제공
 */

@Slf4j
@Component
@AllArgsConstructor
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final CustomAuthorityUtils customAuthorityUtils;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{

        Member member = memberRepository.findByEmail(username).orElseThrow(MemberNotFoundException::new);

            return new MemberDetails(member);
        }


    public final class MemberDetails extends Member implements UserDetails{

        MemberDetails(Member member){
            setMemberId(member.getMemberId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setImage(member.getImage());
            setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return customAuthorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getUsername() {
            return getEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }
}
