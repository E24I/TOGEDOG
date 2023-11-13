package togedog.server.domain.member.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.member.dto.MemberDto;

@RestController
@RequestMapping("/member")
@Slf4j
public class MemberController {

    // 회원 가입
    @PostMapping("/signup")
    public ResponseEntity<?> signupMember(@RequestBody MemberDto memberDto){

        return new ResponseEntity<>(HttpStatus.CREATED);
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
}
