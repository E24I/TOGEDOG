import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery } from "@tanstack/react-query";
import {
  ProfileForm,
  TopBox,
  ContentBox,
  HeadText,
  BackIcon,
  ModifyButton,
  ImgInfo,
  TextInfo,
  NameText,
  Introduction,
  CategoryBox,
  DeleteButton,
  Form,
  CategoryForm,
} from "./PetProfileForm.style";
import {
  useDeletePetInfo,
  usePatchPetIntro,
} from "../../../hooks/UserInfoHook";
import { tokenAtom } from "../../../atoms";
import { getPetInfo } from "../../../services/userInfoService";
import ConfirmModal from "../../../atoms/modal/ConfirmModal";
import { PetImgForm } from "../../../atoms/imgForm/ImgForm";
import { petIntro } from "../../../types/userInfoType";

const PetProfileForm = () => {
  const navigate = useNavigate();

  const { petId } = useParams<{ petId: string }>();
  const currentPetId = petId || "";
  const token = useRecoilValue(tokenAtom);

  const [isModal, setIsModal] = useState<boolean>(false);
  const [petData, setPetData] = useState<petIntro>({ petIntro: "" });

  const [isEditing, setIsEditing] = useState(false); // 수정 상태

  const handleEdit = () => {
    setIsEditing(true); // 수정 상태로 전환
  };
  const { register, handleSubmit } = useForm();

  const { mutate: deletePet } = useDeletePetInfo(currentPetId);
  const { mutate: patchPet } = usePatchPetIntro(petData, currentPetId);

  const onSubmit = (data: any) => {
    setIsEditing(false);
    setPetData(data);
    patchPet();
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["petInfo", currentPetId, token],
    queryFn: () => getPetInfo(currentPetId, token),
  });

  if (error) {
    return <div>{petId}Error</div>;
  }
  if (isLoading) {
    return <div>Loading......</div>;
  }
  return (
    <ProfileForm>
      <TopBox>
        <BackIcon onClick={() => navigate(-1)} />
        <HeadText>{`${data?.data.name}`} 프로필</HeadText>
        <div>
          {!isEditing ? (
            <ModifyButton onClick={handleEdit}>수정</ModifyButton>
          ) : (
            <ModifyButton onClick={handleSubmit(onSubmit)}>저장</ModifyButton>
          )}
        </div>
      </TopBox>
      <ContentBox>
        <Form
          onSubmit={(e) => {
            e.preventDefault;
          }}
        >
          <ImgInfo>
            <PetImgForm
              width={200}
              height={200}
              radius={50}
              URL={data?.data.image}
            />
            <NameText>
              <strong>{data?.data.name}</strong> ∙ {data?.data.age}살
            </NameText>
            {isEditing ? (
              <textarea
                placeholder={data?.data.petIntro}
                {...register("petIntro")}
              />
            ) : (
              <Introduction>
                {data?.data.petIntro
                  ? data.data.petIntro
                  : "등록된 소개가 없습니다."}
              </Introduction>
            )}
          </ImgInfo>
          <TextInfo>
            <CategoryBox>
              <CategoryForm>
                <h3>견종</h3>
                {<p>{data?.data.type ?? "등록된 견종이 없습니다."}</p>}
              </CategoryForm>
              <CategoryForm>
                <h3>나이</h3>
                {<p>{data?.data.age} 살</p>}
              </CategoryForm>
              <CategoryForm>
                <h3>성별</h3>
                {<p>{data?.data.gender === "FEMALE" ? "여자" : "남자"}</p>}
              </CategoryForm>
            </CategoryBox>
          </TextInfo>
        </Form>
      </ContentBox>
      {isModal ? (
        <ConfirmModal
          confirmContent={"삭제하시겠습니까?"}
          positiveContent={"예"}
          negativeContent={"아니오"}
          handlePositiveFunc={deletePet}
          handleNegativeFunc={() => setIsModal(false)}
        />
      ) : null}
      <DeleteButton onClick={() => setIsModal(true)}>삭제</DeleteButton>
    </ProfileForm>
  );
};

export default PetProfileForm;
