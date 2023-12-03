package togedog.server.domain.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.auth.utils.CustomAuthorityUtils;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.exception.businessexception.memberexception.MemberExistException;
import togedog.server.global.mail.MailService;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MailService mailService;
    private final MemberRepository memberRepository;
    private final LoginMemberUtil loginMemberUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomAuthorityUtils customAuthorityUtils;

    //비밀번호 체크 로직
    public Boolean pwCheck(String password, String pwConfirm){

        if(pwConfirm.equals(password)){
            return true;
        }
        return false;
    }

    //회원 생성 로직
    public Member createMember(Member member){
        verifyExistsEmail(member.getEmail());

        log.info("password = {}", member.getPassword());

        //패스워드 암호화
        String encryptedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encryptedPassword);

        List<String> roles = customAuthorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

        Member savedMember = memberRepository.save(member);

        return savedMember;
    }

    //이메일 확인 로직
    private void verifyExistsEmail(String email){
        Optional<Member> optionalMember = memberRepository.findByEmail(email);
        if(optionalMember.isPresent()){
            throw new MemberExistException();
        }
    }

    //멤버 찾기 로직
    public Long findMember(){

        return loginMemberUtil.getLoginMemberId();
    }


    //닉네임 확인 로직
    public Boolean checkNickname(String nickname){
        Boolean bool = memberRepository.existsMemberByNicknameContaining(nickname);
        return bool;
    }



}
