package togedog.server.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String password;

    @Column(nullable = false)
    private String nickname;

    @Lob
    @Column(nullable = true)
    private String image;

    @Column(nullable = true)
    private String myIntro;

    @Column(nullable = false)
    private Boolean agree1;

    @Column(nullable = false)
    private Boolean agree2;

    @Enumerated(EnumType.STRING)
    private Role role;


    //단방향 매핑만 진행해놓고 추후에 필요시 양방향 추가 예정

}
