package togedog.server.domain.pet.entity;

public enum Gender {
    MALE("남"),
    FEMALE("여");

    final private String gender;

    Gender(String gender) {
        this.gender = gender;
    }
}
