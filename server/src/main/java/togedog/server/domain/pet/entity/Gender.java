package togedog.server.domain.pet.entity;

public enum Gender {
    MALE("남아"),
    FEMALE("여아");

    final private String gender;

    Gender(String gender) {
        this.gender = gender;
    }
}
