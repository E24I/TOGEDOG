package togedog.server.domain.member.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import togedog.server.domain.feed.entity.Feed;
import togedog.server.domain.pet.entity.Pet;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@ToString
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, updatable = false, unique = true)
    private String email;

    @Column(nullable = true, length = 100)
    private String password;

    @Column(nullable = false, length = 100, unique = true)
    private String nickname;

    @Lob
    @Column(nullable = true)
    private String image;

    @Column(nullable = true, length = 1000)
    private String myIntro;

    @Column(nullable = false)
    private Boolean agree1;

    @Column(nullable = false)
    private Boolean agree2;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Pet> pet = new ArrayList<>();

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Feed> feed = new ArrayList<>();


    //단방향 매핑만 진행해놓고 추후에 필요시 양방향 추가 예정


    public Member(String email, String nickname, String image) {
        this.email = email;
        this.nickname = nickname;
        this.image = image;
        this.agree1 = true;
        this.agree2 = true;
    }
}
