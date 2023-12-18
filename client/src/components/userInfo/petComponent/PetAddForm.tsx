import React from "react";
import {
  PetAddContainer,
  TopBox,
  BackIcon,
  Title,
  MiddleBox,
  RegisterButton,
} from "./PetAdd.style";

const PetAddForm: React.FC = () => {
  return (
    <PetAddContainer>
      <TopBox>
        <BackIcon />
        <Title>펫 등록</Title>
      </TopBox>
      <MiddleBox>몸통 -이미지등록, -견종, -생일, -성별</MiddleBox>
      <RegisterButton>등록</RegisterButton>
    </PetAddContainer>
  );
};

export default PetAddForm;
