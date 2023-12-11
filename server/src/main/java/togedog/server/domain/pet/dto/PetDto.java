package togedog.server.domain.pet.dto;

import lombok.Getter;
import lombok.Setter;
import togedog.server.domain.member.mapper.MemberInfo;
import togedog.server.domain.pet.entity.Gender;

public class PetDto {

    @Getter
    public static class Post{

        private String name;
        private Long age;
        private String type;
        private String personality;
        private String significant;
        private String petIntro;
        private Gender gender;
        private String image;
    }

    @Setter
    @Getter
    public static class Response{
        private String petId;
        private MemberInfo memberInfo;
        private String name;
        private Long age;
        private String type;
        private String personality;
        private String significant;
        private String petIntro;
        private Gender gender;
        private String image;
    }

}
