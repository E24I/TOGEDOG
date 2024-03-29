package togedog.server.domain.pet.entity;

import togedog.server.domain.member.entity.Member;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
public class Pet extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long PetId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Long age;

    @Column(nullable = true)
    private String type;

    @Column(nullable = true)
    private String personality;

    @Column(nullable = true)
    private String significant;

    @Column(nullable = true)
    private String petIntro;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column(nullable = true)
    @Lob
    private String image;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
