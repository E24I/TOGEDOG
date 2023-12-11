package togedog.server.domain.pet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import togedog.server.domain.member.mapper.MemberInfo;
import togedog.server.domain.pet.dto.PetDto;
import togedog.server.domain.pet.entity.Pet;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PetMapper {

    Pet petPostDtoToPet(PetDto.Post petPostDto);

    default PetDto.Response petTopetResponseDto(Pet pet) {
        if (pet == null) {
            return null;
        } else {
            PetDto.Response response = new PetDto.Response();
            if (pet.getPetId() != null) {
                response.setPetId(String.valueOf(pet.getPetId()));
            }

            response.setName(pet.getName());
            response.setAge(pet.getAge());
            response.setType(pet.getType());
            response.setPersonality(pet.getPersonality());
            response.setSignificant(pet.getSignificant());
            response.setPetIntro(pet.getPetIntro());
            response.setGender(pet.getGender());
            response.setImage(pet.getImage());
            response.setMemberInfo(MemberInfo.of(pet.getMember()));
            return response;
        }
    }
}