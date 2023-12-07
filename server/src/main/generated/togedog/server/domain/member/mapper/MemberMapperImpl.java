package togedog.server.domain.member.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import togedog.server.domain.member.dto.MemberDto;
import togedog.server.domain.member.entity.Member;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2023-12-06T16:17:43+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.20 (Azul Systems, Inc.)"
)
@Component
public class MemberMapperImpl implements MemberMapper {

    @Override
    public Member memberPostDtoToMember(MemberDto.Post memberPostDto) {
        if ( memberPostDto == null ) {
            return null;
        }

        Member member = new Member();

        member.setEmail( memberPostDto.getEmail() );
        member.setPassword( memberPostDto.getPassword() );
        member.setNickname( memberPostDto.getNickname() );
        if ( memberPostDto.getAgree1() != null ) {
            member.setAgree1( Boolean.parseBoolean( memberPostDto.getAgree1() ) );
        }
        if ( memberPostDto.getAgree2() != null ) {
            member.setAgree2( Boolean.parseBoolean( memberPostDto.getAgree2() ) );
        }

        return member;
    }

    @Override
    public MemberDto.ResponseMemberInfo memberToResponseMemberInfo(Member member) {
        if ( member == null ) {
            return null;
        }

        MemberDto.ResponseMemberInfo.ResponseMemberInfoBuilder responseMemberInfo = MemberDto.ResponseMemberInfo.builder();

        responseMemberInfo.memberId( member.getMemberId() );
        responseMemberInfo.email( member.getEmail() );
        responseMemberInfo.nickname( member.getNickname() );
        responseMemberInfo.image( member.getImage() );
        responseMemberInfo.myIntro( member.getMyIntro() );

        return responseMemberInfo.build();
    }
}
