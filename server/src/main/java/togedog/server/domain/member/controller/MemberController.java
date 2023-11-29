package togedog.server.domain.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.member.dto.MemberDto;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.mapper.MemberMapper;
import togedog.server.domain.member.service.MemberService;
import togedog.server.global.exception.businessexception.memberexception.MemberPasswordException;
import togedog.server.global.mail.MailService;
import togedog.server.global.mail.dto.EmailCheckDto;

import javax.validation.Valid;

@RestController
@RequestMapping("/member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MailService mailService;
    private final MemberService memberService;
    private final MemberMapper mapper;

    /*
    회원 가입
     */
    @PostMapping("/signup")
    public ResponseEntity<Member> signupMember(@RequestBody @Valid MemberDto.Post memberPostDto){

        Boolean pwCheck = memberService.pwCheck(memberPostDto.getPassword(), memberPostDto.getPwConfirm());

        if(pwCheck){
            Member member = mapper.memberPostDtoToMember(memberPostDto);
            memberService.createMember(member);
            return new ResponseEntity<>(HttpStatus.CREATED);
        }else {
            throw new MemberPasswordException();
        }
    }

    /*
    닉네임 중복 확인
     */
    @PostMapping("/signup/nickname/check")
    public ResponseEntity<Boolean> nicknameCheck(@RequestParam("n") String nickname){

        Boolean bool = memberService.checkNickname(nickname);

        return new ResponseEntity<>(bool,HttpStatus.ACCEPTED);
    }

    @GetMapping("/kk")
    public String getMember(@RequestParam("par") String par){

        Long findmember = memberService.findMember();
        System.out.println(findmember);

        return "param = " + par + " \n memberId = " + findmember;
    }

    /*
    회원가입 확인 메일 전송
     */
    @PostMapping("/signup/emails/send-code")
    public ResponseEntity sendMessage(@RequestParam("email") String email) {
        mailService.sendCodeToEmail(email);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /*
    회원가입 코드 체크
     */
    @PostMapping("/signup/emails/check")
    public ResponseEntity emailCheck(@RequestBody EmailCheckDto emailCheckDto){
        Boolean checked = mailService.checkAuthNum(emailCheckDto.getEmail(), emailCheckDto.getAuthNum());

        if(checked){
            return new ResponseEntity(HttpStatus.OK);
        }

        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }



}
