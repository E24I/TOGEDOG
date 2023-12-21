package togedog.server.domain.pet.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import togedog.server.domain.member.entity.Member;
import togedog.server.global.entity.BaseEntity;

import javax.persistence.*;

@Entity
@Setter
@Getter
public class Pet extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long PetId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Long age;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Gender gender;

    @Column(nullable = true)
    private String type;

    @Column(nullable = true)
    private String petIntro;

    @Column(nullable = true)
    @Lob
    private String image;

    @ManyToOne
    @JoinColumn(name = "member_id")
    @JsonIgnore
    private Member member;


}
