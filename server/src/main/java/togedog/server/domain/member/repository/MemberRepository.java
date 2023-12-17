package togedog.server.domain.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import togedog.server.domain.member.entity.Member;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByEmail(String email);

    Boolean existsMemberByNicknameContaining(String nickname);

    Optional<Member> findMemberByNickname(String nickname);

    void deleteMemberByMemberId(Long memberId);

    @Modifying
    @Query("UPDATE Member m SET m.nickname = :nickname WHERE m.memberId = :memberId")
    int updateMemberByMemberIdEqualsForNickname(@Param("memberId") Long memberId, @Param("nickname") String nickname);

    @Modifying
    @Query("UPDATE Member m SET m.myIntro = :myIntro WHERE m.memberId = :memberId")
    int updateMemberByMemberIdEqualsForMyIntro(@Param("memberId") Long memberId, @Param("myIntro") String myIntro);

}

