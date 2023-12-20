import React from "react";
import { useForm } from "react-hook-form";

import {
  PetAddContainer,
  TopBox,
  BackIcon,
  Title,
  MiddleBox,
  RegisterButton,
  Input,
} from "./PetAdd.style";

const PetAddForm: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm();
  return (
    <PetAddContainer>
      <TopBox>
        <BackIcon />
        <Title>펫 등록</Title>
      </TopBox>
      {/* 몸통 -이미지등록, -견종, -나이, -성별, 소개 */}
      <MiddleBox>
        <form>
          <Input
            type="text"
            placeholder="반려동물의 이름 입력해주세요."
            autoComplete="off"
            {...register("name", { required: true })}
          />
          <Input
            type="text"
            placeholder="반려동물의 종류를 입력해주세요."
            autoComplete="off"
            {...register("type")}
          />
          <Input
            type="text"
            placeholder="반려동물의 나이를 입력해주세요."
            autoComplete="off"
            {...register("age", { required: true })}
          />
          {/* 성별은 토글로 입력예정 */}
          <Input
            type="text"
            placeholder="반려동물의 소개를 자유롭게 입력해주세요."
            autoComplete="off"
            {...register("intro")}
          />
        </form>
      </MiddleBox>
      <RegisterButton>등록</RegisterButton>
    </PetAddContainer>
  );
};

export default PetAddForm;
