package togedog.server.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(nullable = false, length = 100)
    private String password;

    @Column(nullable = false, length = 100)
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

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();


    //단방향 매핑만 진행해놓고 추후에 필요시 양방향 추가 예정

}
