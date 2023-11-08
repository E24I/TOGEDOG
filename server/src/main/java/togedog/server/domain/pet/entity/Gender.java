package togedog.server.domain.pet.entity;

public enum Gender {
    MALE("남자"),
    FEMALE("여자");

    final private String gender;

    Gender(String gender) {
        this.gender = gender;
    }
}
