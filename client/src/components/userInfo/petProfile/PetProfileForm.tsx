import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { useQuery, useMutation } from "@tanstack/react-query";
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
  // IssueListForm,
  // Issues,
} from "./PetProfileForm.style";
import { Category } from "./component/Category";
import { useDeletePetInfo } from "../../../hooks/UserInfoHook";
import { tokenAtom } from "../../../atoms";
import { getPetInfo } from "../../../services/userInfoService";
import ConfirmModal from "../../../atoms/modal/ConfirmModal";
import { queryClient } from "../../..";
import { PetImgForm } from "../../../atoms/imgForm/ImgForm";

const PetProfileForm = () => {
  const navigate = useNavigate();

  const { petId } = useParams<{ petId: string }>();
  const currentPetId = petId || "";
  const token = useRecoilValue(tokenAtom);

  const [isModal, setIsModal] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState(false); // 수정 상태
  const [introduction, setIntroduction] = useState("나는야 퉁퉁이"); // 소개 value
  const [kind, setKind] = useState("푸들"); // 견종 vlaue
  const [birthday, setBirthday] = useState("2023년 9월 5일"); // 생일 vlaue
  const [gender, setGender] = useState("여"); // 성별 vlaue
  const [character, setCharacter] = useState("발랄"); // 성격 vlaue

  // const { mutate } = useMutation({
  //   mutationFn: async () => {
  //     "postAPI"; //ex.포스트요청
  //   },
  //   onSuccess: (res) => {
  //     console.log(res);
  //     queryClient.invalidateQueries({ queryKey: ["petInfo"] });
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //   },
  // });

  const goBack = () => {
    navigate(-1); // 뒤로가기 버튼
  };

  const handleEdit = () => {
    setIsEditing(!isEditing); // 수정 상태로 전환
  };

  const { mutate: deletePet } = useDeletePetInfo(currentPetId);
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
        <BackIcon onClick={goBack} />
        <HeadText>{`${data?.data.name}`} 프로필</HeadText>
        <div>
          {!isEditing ? (
            <ModifyButton onClick={handleEdit}>수정</ModifyButton>
          ) : (
            <ModifyButton onClick={handleEdit}>저장</ModifyButton>
          )}
        </div>
      </TopBox>
      <ContentBox>
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
              value={introduction}
              onChange={(e) => {
                setIntroduction(e.target.value);
              }}
            />
          ) : (
            <Introduction>{data?.data.petIntro}</Introduction>
          )}
        </ImgInfo>
        <TextInfo>
          <CategoryBox>
            <Category
              title="견종"
              isEditing={isEditing}
              value={
                data?.data.type ? data?.data.type : "등록된 견종이 없습니다."
              }
              setValue={setKind}
            />
            <Category
              title="생일"
              isEditing={isEditing}
              value={`${data?.data.age} 살`}
              setValue={setBirthday}
            />
            <Category
              title="성별"
              isEditing={isEditing}
              value={data?.data.gender === "FEMALE" ? `여자` : "남자"}
              setValue={setGender}
            />
            <Category
              title="성격"
              isEditing={isEditing}
              value={
                data?.data.personality
                  ? data?.data.personality
                  : "등록된 성격이 없습니다."
              }
              setValue={setCharacter}
            />
          </CategoryBox>
        </TextInfo>
      </ContentBox>
      <DeleteButton onClick={() => setIsModal(true)}>삭제</DeleteButton>
      {isModal ? (
        <ConfirmModal
          confirmContent={"삭제하시겠습니까?"}
          positiveContent={"예"}
          negativeContent={"아니오"}
          handlePositiveFunc={deletePet}
          handleNegativeFunc={() => setIsModal(false)}
        />
      ) : null}
    </ProfileForm>
  );
};

export default PetProfileForm;
