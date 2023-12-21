package togedog.server.global.exception.businessexception.petexception;

import org.springframework.http.HttpStatus;

public class PetMemberNotAccordException extends PetException{

    public static final String MESSAGE = "멤버와 강아지의 주인이 일치하지 않습니다.";
    public static final String CODE = "PET-404";

    public PetMemberNotAccordException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}
