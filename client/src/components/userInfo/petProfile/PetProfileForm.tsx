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
  Img,
  NameText,
  Introduction,
  CategoryBox,
  DeleteButton,
  // IssueListForm,
  // Issues,
} from "./PetProfileForm.style";
import { Category } from "./component/Category";
import { useDeletePetInfo } from "../../../hooks/UserInfoHook";
import { memberIdAtom, tokenAtom } from "../../../atoms";
import { getPetInfo } from "../../../services/userInfoService";
import ConfirmModal from "../../../atoms/modal/ConfirmModal";

const PetProfileForm = () => {
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>();
  const petId = id ? id : "";
  const memberId: number = useRecoilValue(memberIdAtom) || 0;
  const token = useRecoilValue(tokenAtom);

  const [isModal, setIsModal] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState(false); // 수정 상태
  const [introduction, setIntroduction] = useState("나는야 퉁퉁이"); // 소개 value
  const [kind, setKind] = useState("푸들"); // 견종 vlaue
  const [birthday, setBirthday] = useState("2023년 9월 5일"); // 생일 vlaue
  const [gender, setGender] = useState("여"); // 성별 vlaue
  const [character, setCharacter] = useState("발랄"); // 성격 vlaue
  const query = useQuery({
    queryKey: ["petInfo", petId, memberId, token],
    queryFn: () => getPetInfo(petId, memberId, token),
  });

  const goBack = () => {
    navigate(-1); // 뒤로가기 버튼
  };

  const handleEdit = () => {
    setIsEditing(!isEditing); // 수정 상태로 전환
  };

  const { mutate: deletePet } = useDeletePetInfo(petId);
  return (
    <ProfileForm>
      <TopBox>
        <BackIcon onClick={goBack} />
        <HeadText>멍 프로필</HeadText>
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
          <Img />
          <NameText>
            <strong>마루</strong> ∙ 2개월
          </NameText>
          {isEditing ? (
            <textarea
              value={introduction}
              onChange={(e) => {
                setIntroduction(e.target.value);
                console.log(query.data);
              }}
            />
          ) : (
            <Introduction>{introduction}</Introduction>
          )}
        </ImgInfo>
        <TextInfo>
          <CategoryBox>
            <Category
              title="견종"
              isEditing={isEditing}
              value={kind}
              setValue={setKind}
            />
            <Category
              title="생일"
              isEditing={isEditing}
              value={birthday}
              setValue={setBirthday}
            />
            <Category
              title="성별"
              isEditing={isEditing}
              value={gender}
              setValue={setGender}
            />
            {/* <Category
              title="성격"
              isEditing={isEditing}
              value={character}
              setValue={setCharacter}
            /> */}
            {/* <IssueListForm>
              <h3>특이사항</h3>
              <Issues>
                <li>wqeqwe</li>
                <li>wqeqwe</li>
                <li>wqeqwe</li>
                <li>wqeqwe</li>
                <li>wqeqwe</li>
                <li>wqeqwe</li>
              </Issues>
            </IssueListForm> */}
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
