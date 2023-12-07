package togedog.server.domain.pet.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.pet.entity.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {
}
