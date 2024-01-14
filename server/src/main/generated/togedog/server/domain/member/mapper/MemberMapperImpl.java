package togedog.server.domain.member.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import togedog.server.domain.member.dto.MemberDto;
import togedog.server.domain.member.entity.Member;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-01-14T07:41:49+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.19 (Azul Systems, Inc.)"
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
}
