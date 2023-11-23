import React, { useState, useEffect, useRef } from "react";
import {
  MyInfoContainer,
  NickName,
  TopContainer,
  ProFileBox,
  ProFileImg,
  Introduction,
  SectionBox,
  ListSection,
  ButtonSection,
  Button1,
  Button2,
  MoreButton,
  PetListBox,
  PetAdd,
} from "./MyInfoForm.style";
import PetList from "./petComponent/PetList";
import ButtonDrop from "./petComponent/ButtonDrop";
import ProfileChange from "./infoChangeComponent/ProfileChange";

const MyInfoForm: React.FC = () => {
  const [drop, setDrop] = useState<boolean>(false); //드롭다운 ... 버튼
  const dropdownRef = useRef<HTMLButtonElement>(null); //드롭다운 밖클릭시 없어짐
  const [changeInfo, setChangeInfo] = useState<boolean>(false); //프로필변경
  const handleDrop = () => {
    //드롭열기
    setDrop(!drop);
  };
  const handleModal = () => {
    //모달열기
    setChangeInfo(!changeInfo);
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <MyInfoContainer>
      <NickName>NickName</NickName>
      <TopContainer>
        <ProFileBox>
          <ProFileImg />
          <Introduction>저는 김태수입니다.</Introduction>
        </ProFileBox>
        <SectionBox>
          <ListSection>
            <div>
              <p>11</p>
              게시물
            </div>
            <div>
              <p>11</p>
              필로워
            </div>
            <div>
              <p>11</p>
              팔로우
            </div>
          </ListSection>
          <ButtonSection>
            <Button1>???</Button1>
            <Button2 onClick={handleModal}>???</Button2>
            <MoreButton onClick={handleDrop} ref={dropdownRef}>
              ...
            </MoreButton>
            {drop && <ButtonDrop />}
          </ButtonSection>
        </SectionBox>
      </TopContainer>
      <PetListBox>
        <PetList />
        <PetList />
        <PetList />
        <PetAdd />
      </PetListBox>
      {changeInfo && <ProfileChange setChangeInfo={setChangeInfo} />}
    </MyInfoContainer>
  );
};

export default MyInfoForm;
