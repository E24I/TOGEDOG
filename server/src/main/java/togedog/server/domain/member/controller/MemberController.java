package togedog.server.domain.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.member.dto.MemberDto;
import togedog.server.domain.member.dto.MemberFeedDto;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.mapper.MemberMapper;
import togedog.server.domain.member.service.MemberService;
import togedog.server.global.dto.MultiResponseDto;
import togedog.server.global.exception.businessexception.memberexception.MemberPasswordException;
import togedog.server.global.mail.MailService;
import togedog.server.global.mail.dto.EmailCheckDto;

import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

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

        return new ResponseEntity<>(bool,HttpStatus.CREATED);
    }

    /*
    프로필 조회
     */
    @GetMapping("/{member-id}")
    public ResponseEntity<MemberDto.ResponseMemberInfo> findMemberInfo(@PathVariable("member-id")Long memberId){

        Member member = memberService.findMember(memberId);
        MemberDto.ResponseMemberInfo response = mapper.memberToResponseMemberInfo(member);
        return new ResponseEntity<>(response,HttpStatus.OK);
    }

    /*
    프로필 게시글 조회
     */
    @GetMapping("/{member-id}/feed")
    public ResponseEntity<?> findMemberFeed(@PathVariable("member-id")Long memberId,
                                            @RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "10")int size){

        Pageable pageable = PageRequest.of(page -1 , size);
        Page<Feed> pageFeed = memberService.findFeed(pageable, memberId);
        List<MemberFeedDto> memberFeedDtos = new ArrayList<>();

        for(Feed feed : pageFeed.getContent()){
            memberFeedDtos.add(MemberFeedDto.of(feed));
        }
        return new ResponseEntity<>(new MultiResponseDto<>(memberFeedDtos,pageFeed), HttpStatus.OK);
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
