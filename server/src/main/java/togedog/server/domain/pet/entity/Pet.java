package togedog.server.domain.pet.entity;

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

    @Column
    private String type;

    @Column
    private String personality;

    @Column
    private String significant;

    @Column
    private String petIntro;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Column
    @Lob
    private String image;

}
