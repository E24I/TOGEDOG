//package togedog.server.global.auth.details;
//
//import lombok.Data;
//import lombok.Getter;
//import lombok.RequiredArgsConstructor;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import togedog.server.domain.member.entity.Member;
//import togedog.server.global.auth.utils.CustomAuthorityUtils;
//
//import javax.persistence.Column;
//import javax.persistence.ElementCollection;
//import javax.persistence.FetchType;
//import javax.persistence.Lob;
//import java.util.ArrayList;
//import java.util.Collection;
//import java.util.Collections;
//import java.util.List;
//
//@Data
//public final class MemberDetails implements UserDetails {
//
//    private final Member member;
//
//    public MemberDetails(Member member) {
//        this.member = member;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        Collection<GrantedAuthority> authorities = new ArrayList<>();
//        this.member.getRoles().forEach(role -> {
//            authorities.add(() -> role);
//        });
//        return authorities;
//    }
//
//    @Override
//    public String getPassword() {
//        return member.getPassword();
//    }
//
//    @Override
//    public String getUsername() {
//        return member.getEmail();
//    }
//
//    @Override
//    public boolean isAccountNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() {
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() {
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() {
//        return true;
//    }
//}