import React, { useState } from "react";
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
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data); // 폼 데이터 처리
  };
  return (
    <PetAddContainer>
      <TopBox>
        <BackIcon />
        <Title>펫 등록</Title>
      </TopBox>
      <MiddleBox>
        <form onSubmit={handleSubmit(onSubmit)}>
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
          <label>
            여자
            <input
              type="radio"
              value="FEMAIL"
              {...register("gender", { required: true })}
            />
          </label>
          <label>
            남자
            <input
              type="radio"
              value="MALE"
              {...register("gender", { required: true })}
            />
          </label>
          <Input
            type="text"
            placeholder="반려동물의 소개를 자유롭게 입력해주세요."
            autoComplete="off"
            {...register("intro")}
          />
          <RegisterButton type="submit">등록</RegisterButton>
        </form>
      </MiddleBox>
    </PetAddContainer>
  );
};

export default PetAddForm;
