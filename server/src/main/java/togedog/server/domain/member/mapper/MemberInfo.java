package togedog.server.domain.member.mapper;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import togedog.server.domain.member.entity.Member;

@Getter
@Builder
@AllArgsConstructor
public class MemberInfo {

    private Long memberId;
    private String nickname;
    private String imageUrl;

    public static MemberInfo of(Member member) {
        return MemberInfo.builder()
                .memberId(member.getMemberId())
                .nickname(member.getNickname())
                .imageUrl(member.getImage())
                .build();
    }
}
