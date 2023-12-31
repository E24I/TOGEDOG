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
    Pet 생성
     */
    @PostMapping("/create")
    public ResponseEntity<?> postPet(@RequestBody PetDto.Post petDto){

        Pet pet = petMapper.petPostDtoToPet(petDto);
        Pet createdPet = petService.createPet(pet);
        URI location = UriCreator.createUri("/pet", createdPet.getPetId());

        return ResponseEntity.created(location).build(); //location 으로 return
    }

    /*
    펫 정보 업데이트
     */
    @PatchMapping("/{pet-id}/update")
    public ResponseEntity<?> updatePet(@RequestBody PetDto.Patch patchDto,
                                       @PathVariable("pet-id") Long petId){

        patchDto.setPetId(petId);
        Pet pet = petService.updatePet(patchDto);

        return new ResponseEntity<>(pet,HttpStatus.CREATED);
    }

    /*
    펫 1마리 정보 조회
     */
    @GetMapping("/{pet-id}")
    public ResponseEntity<?> getOnePet(@PathVariable("pet-id") Long petId){

        Pet onePet = petService.findOnePet(petId);
        PetDto.Response response = petMapper.petTopetResponseDto(onePet);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    /*
    펫 삭제
     */
    @DeleteMapping("/{pet-id}/delete")
    public ResponseEntity<?> deletePet(@PathVariable("pet-id")Long petId){

        petService.deleteOnePet(petId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /*
    펫 프로필 이미지 추가, 수정
    */
    @PatchMapping("{pet-id}/image/upload")
    public ResponseEntity<?> uploadPetImage(@PathVariable("pet-id")Long petId,
                                            @RequestBody PetDto.PatchImage imageDto){

        petService.updatePetImage(petId, imageDto.getImage());

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    /*
    펫 프로필 이미지 삭제
   */
    @DeleteMapping("/{pet-id}/image/delete")
    public ResponseEntity<?> deletePetImage(@PathVariable("pet-id")Long petId){

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}
