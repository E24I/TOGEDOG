package togedog.server.domain.member.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import togedog.server.domain.member.dto.MemberDto;
import togedog.server.domain.member.entity.Member;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface MemberMapper {
    Member memberPostDtoToMember(MemberDto.Post memberPostDto);

    default MemberDto.ResponseMemberInfo memberToResponseMemberInfo(Member member){
        if (member == null) {
            return null;
        } else {
            MemberDto.ResponseMemberInfo.ResponseMemberInfoBuilder responseMemberInfo = MemberDto.ResponseMemberInfo.builder();
            responseMemberInfo.memberId(member.getMemberId());
            responseMemberInfo.email(member.getEmail());
            responseMemberInfo.nickname(member.getNickname());
            responseMemberInfo.image(member.getImage());
            responseMemberInfo.myIntro(member.getMyIntro());
            responseMemberInfo.pet(member.getPet());
            return responseMemberInfo.build();
        }
    };
}
