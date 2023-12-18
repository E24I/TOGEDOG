import React, { useState, useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import { memberIdAtom } from "../../atoms";
import {
  MyInfoContainer,
  NickName,
  TopContainer,
  Introduction,
  SectionBox,
  ButtonSection,
  Button1,
  Button2,
  MoreButton,
  PetListBox,
  PetAdd,
} from "./UserInfoForm.style";
import PetList from "./petComponent/PetList";
import ButtonDrop from "./petComponent/ButtonDrop";
import ProfileChange from "./infoChangeComponent/ProfileChange";
import { useGetUserInfo } from "../../hooks/UserInfoHook";
import { infoType, petDataType } from "../../types/userInfoType";
import { UserImgForm } from "../../atoms/imgForm/ImgForm";
import PasswordChangeForm from "./infoChangeComponent/PasswordChange";

const MyInfoForm: React.FC = () => {
  const [drop, setDrop] = useState<boolean>(false); //드롭다운 ... 버튼
  const dropdownRef = useRef<HTMLButtonElement>(null); //드롭다운 밖클릭시 없어짐
  const [changeInfo, setChangeInfo] = useState<boolean>(false); //프로필변경
  const [lostPw, setLostPw] = useState<boolean>(false); //비번변경
  const [userData, setUserData] = useState<infoType | undefined>(undefined); //유저 데이터담기
  const memberId = useRecoilValue(memberIdAtom);
  const { mutate: getInfoMutate } = useGetUserInfo(
    Number(memberId),
    setUserData,
  );
  const handleDrop = () => {
    //드롭열기
    setDrop(!drop);
  };
  const handleInfoModal = () => {
    //모달열기
    setChangeInfo(!changeInfo);
  };
  const handlePasswordModal = () => {
    //모달열기
    setLostPw(!lostPw);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDrop(false);
    }
  };
  useEffect(() => {
    getInfoMutate();
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <MyInfoContainer>
      <NickName>{userData?.nickname}</NickName>
      <TopContainer>
        <UserImgForm
          width={150}
          height={150}
          radius={50}
          // URL={
          //   "https://i.pinimg.com/736x/64/63/40/646340423a648806278bfc51d055f7e6.jpg"
          // }
        />
        <SectionBox>
          <ButtonSection>
            <Button1 onClick={handlePasswordModal}>비밀번호 변경</Button1>
            <Button2 onClick={handleInfoModal}>프로필 수정</Button2>
            <MoreButton onClick={handleDrop} ref={dropdownRef}>
              ...
            </MoreButton>
            {drop && <ButtonDrop />}
          </ButtonSection>
        </SectionBox>
      </TopContainer>
      <Introduction>
        {userData?.myIntro !== null
          ? userData?.myIntro
          : "자기소개 글이 없습니다."}
      </Introduction>
      <PetListBox>
        {Array.isArray(userData?.pet) &&
          userData?.pet.map((el: petDataType) => (
            <PetList
              name={el.name}
              image={el.image}
              id={el.petId}
              key={el.petId}
            />
          ))}
        <PetAdd />
      </PetListBox>
      {changeInfo && (
        <ProfileChange
          setChangeInfo={setChangeInfo}
          nickname={userData?.nickname}
          intro={userData?.myIntro}
        />
      )}
      {lostPw && <PasswordChangeForm setLostPw={setLostPw} />}
    </MyInfoContainer>
  );
};

export default MyInfoForm;
