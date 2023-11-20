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

const MyInfoForm: React.FC = () => {
  const [drop, setDrop] = useState<boolean>(false); //드롭다운 ... 버튼
  const dropdownRef = useRef<HTMLDivElement>(null); //드롭다운 밖클릭시 없어짐
  const handleDrop = () => {
    setDrop(!drop);
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
          <ButtonSection ref={dropdownRef}>
            <Button1>???</Button1>
            <Button2>???</Button2>
            <MoreButton onClick={handleDrop}>...</MoreButton>
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
    </MyInfoContainer>
  );
};

export default MyInfoForm;
