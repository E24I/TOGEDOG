package togedog.server.domain.pet.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;
import togedog.server.domain.pet.dto.PetDto;
import togedog.server.domain.pet.entity.Pet;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface PetMapper {

    Pet petPostDtoToPet(PetDto.Post petPostDto);

    PetDto.Response petTopetResponseDto(Pet pet);
}
