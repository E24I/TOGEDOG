import React from "react";
import {
  MyInfoContainer,
  ProFileBox,
  ProFileImg,
  NickName,
  SectionBox,
  PetList,
} from "./MyInfoForm.style";

const MyInfoForm = () => {
  return (
    <MyInfoContainer>
      <NickName>김태수</NickName>
      <ProFileBox>
        <ProFileImg />
      </ProFileBox>
      <SectionBox></SectionBox>
      <PetList></PetList>
    </MyInfoContainer>
  );
};

export default MyInfoForm;
