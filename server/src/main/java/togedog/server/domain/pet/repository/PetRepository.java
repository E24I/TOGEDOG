package togedog.server.domain.pet.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.pet.entity.Pet;

public interface PetRepository extends JpaRepository<Pet, Long> {

    Page<Pet> findAllByMember(Member member, Pageable pageable);

}
