package togedog.server.domain.pet.service;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import togedog.server.domain.member.entity.Member;
import togedog.server.domain.member.repository.MemberRepository;
import togedog.server.domain.pet.dto.PetDto;
import togedog.server.domain.pet.entity.Pet;
import togedog.server.domain.pet.repository.PetRepository;
import togedog.server.global.auth.utils.LoginMemberUtil;
import togedog.server.global.exception.businessexception.memberexception.MemberAccessDeniedException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;
import togedog.server.global.exception.businessexception.petexception.PetMemberNotAccordException;
import togedog.server.global.exception.businessexception.petexception.PetNotFoundException;

@Service
@AllArgsConstructor
@Slf4j
public class PetService {

    private final PetRepository petRepository;
    private final LoginMemberUtil loginMemberUtil;
    private final MemberRepository memberRepository;


    public Pet createPet(Pet pet){
        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if(loginMemberId != null){
            Member member = memberRepository.findById(loginMemberId).orElseThrow(
                    () -> new MemberNotFoundException());
            pet.setMember(member);
            petRepository.save(pet);
        }else {
            throw new MemberNotLoginException();
        }
        return pet;
    }

    public Pet updatePet(PetDto.Patch patchDto){
        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if(loginMemberId == null){
            throw new MemberNotLoginException();
        }

        Pet pet = petRepository.findById(patchDto.getPetId())
                .orElseThrow(() -> new PetNotFoundException());

        if(loginMemberId != pet.getMember().getMemberId()){
            throw new PetMemberNotAccordException();
        }

        pet.setPetIntro(patchDto.getPetIntro());
        pet.setImage(patchDto.getImage());

        return petRepository.save(pet);
    }



//
//    public Page<Pet> findPet(Pageable pageable){
//
//        Long loginMemberId = loginMemberUtil.getLoginMemberId();
//
//        if(loginMemberId != null){
//            Member member = memberRepository.findById(loginMemberId).orElseThrow(
//                    () -> new MemberNotFoundException());
//
//            Page<Pet> pagePetList = petRepository.findAllByMember(member, pageable);
//            return pagePetList;
//        }else {
//            throw new MemberNotLoginException();
//        }
//    }


    public Pet findOnePet(Long petId){
        Pet pet = petRepository.findById(petId).orElseThrow(() -> new PetNotFoundException());
        return pet;
    }



    public void deleteOnePet(Long petId){
        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if(loginMemberId == null){
            throw new MemberNotLoginException();
        }
        Pet findedPet = findOnePet(petId);
        if(findedPet.getMember().getMemberId() == loginMemberId){
            petRepository.deleteById(petId);
        }else {
            throw new MemberAccessDeniedException();
        }
    }


}
