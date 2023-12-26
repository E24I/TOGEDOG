import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import {
  PetAddContainer,
  TopBox,
  BackIcon,
  Title,
  MiddleBox,
  RegisterButton,
  Input,
} from "./PetAdd.style";
import { postPetInfo } from "../../../services/userInfoService";
import { tokenAtom } from "../../../atoms";

const PetAddForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  // const { mutate: postPetMutate } = usePostPet(requestObj);
  const toekn = useRecoilValue(tokenAtom);
  const onSubmit = (data: any) => {
    postPetInfo(data, toekn);
    navigate(-1);
  };
  return (
    <PetAddContainer>
      <TopBox>
        <BackIcon onClick={() => navigate(-1)} />
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
            {...register("age", {
              required: true,
              pattern: {
                value: /^[0-9]*$/, // 숫자만 입력할 수 있는 정규식 패턴
                message: "반려동물의 나이를 숫자로 입력해주세요.", // 숫자가 아닌 경우의 오류 메시지
              },
            })}
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
            {...register("petIntro")}
          />
          <RegisterButton type="submit">등록</RegisterButton>
        </form>
      </MiddleBox>
    </PetAddContainer>
  );
};

export default PetAddForm;
