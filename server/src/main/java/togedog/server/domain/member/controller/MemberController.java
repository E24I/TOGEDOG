package togedog.server.domain.member.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feedbookmark.entity.FeedBookmark;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.member.dto.MemberDto;
import togedog.server.domain.member.dto.MemberFeedDto;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.mapper.MemberInfo;
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
    회원 삭제
     */
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteMember(){
        memberService.deleteMember();
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping("/update/password")
    public ResponseEntity<?> updatePassword(@RequestBody MemberDto.PatchPassword passwordDto){

        memberService.updatePassword(passwordDto);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
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
    닉네임으로 회원을 조회
     */
    @GetMapping("/find")
    public ResponseEntity<?> findnickname(@RequestParam("n") String nickname){
        Member member = memberService.findNickname(nickname);
        MemberInfo memberInfo = MemberInfo.of(member);
        return new ResponseEntity<>(memberInfo, HttpStatus.OK);
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

        Pageable pageable = PageRequest.of(page -1 , size, Sort.by("createdDateTime").descending());
        Page<Feed> pageFeed = memberService.findFeed(pageable, memberId);
        List<MemberFeedDto> memberFeedDtos = new ArrayList<>();

        for(Feed feed : pageFeed.getContent()){
            memberFeedDtos.add(MemberFeedDto.of(feed));
        }
        return new ResponseEntity<>(new MultiResponseDto<>(memberFeedDtos,pageFeed), HttpStatus.OK);
    }

    /*
    본인이 좋아요 한 게시글 조회
     */
    @GetMapping("/{member-id}/feed-like")
    public ResponseEntity<?> findMemberFeedLike(@PathVariable("member-id")Long memberId,
                                            @RequestParam(defaultValue = "1") int page,
                                            @RequestParam(defaultValue = "10")int size){

        Pageable pageable = PageRequest.of(page -1 , size, Sort.by("createdDateTime").descending());
        Page<FeedLike> pageFeedLike = memberService.findFeedLike(pageable, memberId);

        List<FeedLike> content = pageFeedLike.getContent(); //feedLike List를 받아온다.
        List<Feed> feedList = new ArrayList<>();
        List<MemberFeedDto> memberFeedDtos = new ArrayList<>();
        content.stream().forEach(x -> feedList.add(x.getFeed()));
        feedList.stream().forEach(x -> memberFeedDtos.add(MemberFeedDto.of(x)));

        return new ResponseEntity<>(new MultiResponseDto<>(memberFeedDtos,pageFeedLike), HttpStatus.OK);
    }

    /*
    본인이 북마크 한 게시글 조회
    */
    @GetMapping("/{member-id}/feed-bookmark")
    public ResponseEntity<?> findMemberFeedBookmark(@PathVariable("member-id")Long memberId,
                                                @RequestParam(defaultValue = "1") int page,
                                                @RequestParam(defaultValue = "10")int size){

        Pageable pageable = PageRequest.of(page -1 , size, Sort.by("createdDateTime").descending());
        Page<FeedBookmark> pageFeedBookmark = memberService.findFeedBookmark(pageable, memberId);

        List<FeedBookmark> content = pageFeedBookmark.getContent(); //feedLike List를 받아온다.
        List<Feed> feedList = new ArrayList<>();
        List<MemberFeedDto> memberFeedDtos = new ArrayList<>();
        content.stream().forEach(x -> feedList.add(x.getFeed()));
        feedList.stream().forEach(x -> memberFeedDtos.add(MemberFeedDto.of(x)));

        return new ResponseEntity<>(new MultiResponseDto<>(memberFeedDtos,pageFeedBookmark), HttpStatus.OK);
    }

    /*
    회원가입 확인 메일 전송
     */
    @PostMapping("/signup/emails/send-code")
    public ResponseEntity sendSingnupMessage(@RequestParam("email") String email) {
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

    /*
    비밀번호 변경 메일 전송
     */
    @PostMapping("/find/emails/send-code")
    public ResponseEntity<?> sendPasswordMessage(@RequestParam("email") String email){
        mailService.sendPasswordCodeToEmail(email);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    /*
    비밀번호 변경 코드 체크
    */
    @PostMapping("/find/emails/check")
    public ResponseEntity emailPasswordCheck(@RequestBody EmailCheckDto emailCheckDto){
        Boolean checked = mailService.checkAuthNum(emailCheckDto.getEmail(), emailCheckDto.getAuthNum());

        if(checked){
            return new ResponseEntity(HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.FORBIDDEN);
    }

    /*
    닉네임(nickname) 수정
     */
    @PatchMapping("/update/nickname")
    public ResponseEntity<?> updateNickname(@Valid @RequestBody MemberDto.PatchNickname nicknameDto){
        memberService.updateNickname(nicknameDto.getNickname());
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    /*
    소개글(myintro) 수정
     */
    @PatchMapping("/update/myintro")
    public ResponseEntity<?> updateMyintro(@RequestBody MemberDto.PatchIntro myintroDto){

        memberService.updateMyintro(myintroDto.getMyIntro());

        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }


}
