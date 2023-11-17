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
import togedog.server.global.mail.MailService;
import togedog.server.global.mail.dto.EmailCheckDto;

import java.net.URI;

@RestController
@RequestMapping("/member")
@Slf4j
@RequiredArgsConstructor
public class MemberController {

    private final MailService mailService;
    private final MemberService memberService;
    private final MemberMapper mapper;

    // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity<Member> signupMember(@RequestBody MemberDto.Post memberPostDto){

        Member member = mapper.memberPostDtoToMember(memberPostDto);
        Member createdMember = memberService.createMember(member);

        return new ResponseEntity<>(createdMember, HttpStatus.CREATED);
    }

    // 로그인 => security 에서 처리
    @PostMapping("/login")
    public ResponseEntity<?> loginMember(@RequestBody MemberDto memberDto){

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @GetMapping()
    public String getMember(@RequestParam("par") String par){

        return "param = par :" + par;
    }

    /*
    회원가입 확인 메일 전송
     */
    @PostMapping("/emails/send-code")
    public ResponseEntity sendMessage(@RequestParam("email") String email) {
        mailService.sendCodeToEmail(email);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /*
    회원가입 코드 체크
     */
    @PostMapping("/emails/check")
    public String emailCheck(@RequestBody EmailCheckDto emailCheckDto){
        Boolean checked = mailService.checkAuthNum(emailCheckDto.getEmail(), emailCheckDto.getAuthNum());
        if(checked){
            return "ok";
        }else{
            return "not ok";
        }
    }



}
