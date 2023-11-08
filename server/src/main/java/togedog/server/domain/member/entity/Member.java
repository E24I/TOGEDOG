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
    @Column
    private String image;

    private String myIntro;

    private Boolean agree1;

    private Boolean agree2;

    @Enumerated(EnumType.STRING)
    private Role role;

}
