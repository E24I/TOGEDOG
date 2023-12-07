package togedog.server.domain.pet.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pet")
public class PetController {

    @PostMapping
    public ResponseEntity<?> createPet(){

        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
