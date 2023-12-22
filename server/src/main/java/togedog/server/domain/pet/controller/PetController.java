package togedog.server.domain.pet.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import togedog.server.domain.pet.dto.PetDto;
import togedog.server.domain.pet.entity.Pet;
import togedog.server.domain.pet.mapper.PetMapper;
import togedog.server.domain.pet.service.PetService;
import togedog.server.global.uri.UriCreator;

import java.net.URI;

@RestController
@RequestMapping("/pet")
@AllArgsConstructor
public class PetController {

    private final PetService petService;
    private final PetMapper petMapper;

    /*
    Pet 작성
     */
    @PostMapping("/create")
    public ResponseEntity<?> postPet(@RequestBody PetDto.Post petDto){

        Pet pet = petMapper.petPostDtoToPet(petDto);
        Pet createdPet = petService.createPet(pet);

        URI location = UriCreator.createUri("/pet", createdPet.getPetId());
        return ResponseEntity.created(location).build(); //location 으로 return
    }

    @PatchMapping("/{pet-id}/update")
    public ResponseEntity<?> updatePet(@RequestBody PetDto.Patch patchDto,
                                       @PathVariable("pet-id") Long petId){

        patchDto.setPetId(petId);

        Pet pet = petService.updatePet(patchDto);

        return new ResponseEntity<>(pet,HttpStatus.CREATED);
    }

    @GetMapping("/{pet-id}")
    public ResponseEntity<?> getOnePet(@PathVariable("pet-id") Long petId){
        Pet onePet = petService.findOnePet(petId);
        PetDto.Response response = petMapper.petTopetResponseDto(onePet);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @DeleteMapping("/{pet-id}/delete")
    public ResponseEntity<?> deletePet(@PathVariable("pet-id")Long petId){
        petService.deleteOnePet(petId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
