package togedog.server.domain.member.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.feed.repository.FeedRepository;
import togedog.server.domain.feedbookmark.entity.FeedBookmark;
import togedog.server.domain.feedbookmark.repository.FeedBookmarkRepository;
import togedog.server.domain.feedlike.entity.FeedLike;
import togedog.server.domain.feedlike.repository.FeedLikeRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.global.auth.utils.CustomAuthorityUtils;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.exception.businessexception.dbexception.DbException;
import togedog.server.global.exception.businessexception.memberexception.MemberExistException;
import togedog.server.global.exception.businessexception.memberexception.MemberNicknameException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final LoginMemberUtil loginMemberUtil;
    private final FeedRepository feedRepository;
    private final FeedLikeRepository feedLikeRepository;
    private final FeedBookmarkRepository feedBookmarkRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomAuthorityUtils customAuthorityUtils;

    //비밀번호 체크 로직
    public Boolean pwCheck(String password, String pwConfirm){

        if(pwConfirm.equals(password)) return true;
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


    //멤버 프로필 조회
    public Member findMember(Long memberId){
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberNotFoundException());
        return member;
    }

    //프로필 게시글 조회
    public Page<Feed> findFeed(Pageable pageable, Long memberId){
        Member member = findMember(memberId);
        return feedRepository.findAllByMemberAndDeleteYnIsFalse(member, pageable);
    }

    //프로필-좋아요 게시글 조회
    public Page<FeedLike> findFeedLike(Pageable pageable, Long memberId){
        Member member = findMember(memberId);

        return feedLikeRepository.findAllByMember(pageable,member);
    }

    //프로필-북마크 게시글 조회
    public Page<FeedBookmark> findFeedBookmark(Pageable pageable, Long memberId){
        Member member = findMember(memberId);

        return feedBookmarkRepository.findAllByMember(pageable, member);
    }


    //닉네임으로 멤버 조회
    public Member findNickname(String nickname){
        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        Member member = memberRepository.findMemberByNickname(nickname)
                .orElseThrow(() -> new MemberNotFoundException());

        if(member.getMemberId() == loginMemberId){
            throw new MemberNotFoundException();
        }

        return member;
    }

    //닉네임 변경
    @Transactional
    public void updateNickname(String nickname){

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if(loginMemberId == null){
            throw new MemberNotFoundException();
        }

        try {
            memberRepository.updateMemberByMemberIdEqualsForNickname(loginMemberId, nickname);
        }catch (Exception e){
            throw new MemberNicknameException();
        }
    }


    //소개글 변경
    @Transactional
    public void updateMyintro(String myintro){

        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if(loginMemberId == null){
            throw new MemberNotFoundException();
        }

        try {
            memberRepository.updateMemberByMemberIdEqualsForMyIntro(loginMemberId, myintro);
        }catch (Exception e){
            throw new DbException();
        }
    }

    //멤버 삭제
    @Transactional
    public void deleteMember(){
        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if(loginMemberId == null){
            throw new MemberNotFoundException();
        }
        memberRepository.deleteMemberByMemberId(loginMemberId);
    }



    //닉네임 확인 로직
    public Boolean checkNickname(String nickname){
        Boolean bool = memberRepository.existsMemberByNicknameContaining(nickname);
        return bool;
    }



}
