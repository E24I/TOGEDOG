package togedog.server.domain.pet.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import togedog.server.domain.pet.dto.PetDto;
import togedog.server.domain.pet.entity.Pet;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-01-05T18:09:25+0900",
    comments = "version: 1.5.1.Final, compiler: javac, environment: Java 11.0.19 (Azul Systems, Inc.)"
)
@Component
public class PetMapperImpl implements PetMapper {

    @Override
    public Pet petPostDtoToPet(PetDto.Post petPostDto) {
        if ( petPostDto == null ) {
            return null;
        }

        Pet pet = new Pet();

        pet.setName( petPostDto.getName() );
        pet.setAge( petPostDto.getAge() );
        pet.setGender( petPostDto.getGender() );
        pet.setType( petPostDto.getType() );
        pet.setPetIntro( petPostDto.getPetIntro() );
        pet.setImage( petPostDto.getImage() );

        return pet;
    }
}
