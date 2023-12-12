package togedog.server.global.exception.businessexception.petexception;

import org.springframework.http.HttpStatus;

public class PetNotFoundException extends PetException{

    public static final String MESSAGE = "강아지 정보를 확인할 수 없습니다.";
    public static final String CODE = "PET-404";

    public PetNotFoundException() {
        super(CODE, HttpStatus.NOT_FOUND, MESSAGE);
    }
}
