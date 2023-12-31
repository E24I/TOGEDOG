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
import togedog.server.global.exception.businessexception.dbexception.DbException;
import togedog.server.global.exception.businessexception.memberexception.MemberAccessDeniedException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotFoundException;
import togedog.server.global.exception.businessexception.memberexception.MemberNotLoginException;
import togedog.server.global.exception.businessexception.petexception.PetMemberNotAccordException;
import togedog.server.global.exception.businessexception.petexception.PetNotFoundException;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
@Slf4j
public class PetService {

    private final PetRepository petRepository;
    private final LoginMemberUtil loginMemberUtil;
    private final MemberRepository memberRepository;

    //펫 추가
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

    //펫 수정
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


    //펫 1마리 조회
    public Pet findOnePet(Long petId){
        Pet pet = petRepository.findById(petId).orElseThrow(() -> new PetNotFoundException());
        return pet;
    }


    //펫 1마리 삭제
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

    //펫 이미지 업데이트
    @Transactional
    public void updatePetImage(Long petId ,String image){
        Long loginMemberId = loginMemberUtil.getLoginMemberId();

        if(loginMemberId == null){
            throw new MemberNotFoundException();
        }

        try {
            Pet pet = petRepository.findById(petId).orElseThrow(() -> new PetNotFoundException());

            if(pet.getMember().getMemberId() != loginMemberId){
                throw new MemberAccessDeniedException();
            }
            pet.setImage(image);
        }catch (Exception e) {
            throw new DbException();
        }
    }

}
