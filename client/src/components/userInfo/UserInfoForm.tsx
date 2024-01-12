import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { memberIdAtom, tokenAtom, alertAtom } from "../../atoms";
import {
  MyInfoContainer,
  NickName,
  TopContainer,
  Introduction,
  SectionBox,
  ButtonSection,
  MyButton,
  PetListBox,
  PetAdd,
  HeadBox,
  MessageButton,
} from "./UserInfoForm.style";
import PetList from "./petComponent/PetList";
import ProfileChange from "./infoChangeComponent/ProfileChange";
import { petDataType } from "../../types/userInfoType";
import { UserImgForm } from "../../atoms/imgForm/ImgForm";
import PasswordChangeForm from "./infoChangeComponent/PasswordChange";
import { getUserInfo } from "../../services/userInfoService";
import { MyInfoFormProps } from "../../types/memberType";
import { Link } from "react-router-dom";

const MyInfoForm: React.FC<MyInfoFormProps> = ({ pageMemberId }) => {
  const [changeInfo, setChangeInfo] = useState<boolean>(false); //프로필변경
  const [lostPw, setLostPw] = useState<boolean>(false); //비번변경
  const memberId = useRecoilValue(memberIdAtom);
  const token = useRecoilValue(tokenAtom);
  const setAlertModal = useSetRecoilState(alertAtom);
  // 프로필수정 모달 열기
  const handleInfoModal = () => {
    setChangeInfo(!changeInfo);
  };
  // 비밀번로 변경 모달 열기
  const handlePasswordModal = () => {
    setLostPw(!lostPw);
  };
  // 신고하기 모달 열기
  const handleReadyModal = () => {
    setAlertModal("준비중인 서비스입니다.");
  };
  const { data, isLoading, error } = useQuery<any>({
    queryKey: ["userInfo", pageMemberId, token],
    queryFn: () => getUserInfo(Number(pageMemberId), token),
  });
  if (error) {
    return <div>404.....</div>;
  }
  if (isLoading) {
    <div>Loading...</div>;
  }
  return (
    <MyInfoContainer>
      <HeadBox>
        <NickName>{data?.data.nickname}</NickName>
      </HeadBox>
      <TopContainer>
        <UserImgForm
          width={150}
          height={150}
          radius={50}
          URL={data?.data.image}
        />
        <SectionBox>
          <ButtonSection>
            {Number(pageMemberId) === memberId ? (
              <MyButton onClick={handlePasswordModal}>비밀번호 변경</MyButton>
            ) : (
              <MyButton>메세지</MyButton>
            )}
            {Number(pageMemberId) === memberId ? (
              <MyButton onClick={handleInfoModal}>프로필 수정</MyButton>
            ) : (
              <MyButton onClick={handleReadyModal}>신고하기</MyButton>
            )}
          </ButtonSection>
        </SectionBox>
      </TopContainer>
      <Introduction>
        {data?.data.myIntro !== null
          ? data?.data.myIntro
          : "자기소개 글이 없습니다."}
      </Introduction>
      <PetListBox>
        {Array.isArray(data?.data.pet) &&
          data?.data.pet.map((el: petDataType) => (
            <PetList
              name={el.name}
              image={el.image}
              id={el.petId}
              key={el.petId}
            />
          ))}
        {Number(pageMemberId) === memberId ? (
          <Link to="petAdd">
            <PetAdd />
          </Link>
        ) : (
          ""
        )}
      </PetListBox>
      {changeInfo && (
        <ProfileChange
          setChangeInfo={setChangeInfo}
          nickname={data?.data.nickname}
          intro={data?.data.myIntro}
          img={data?.data.image}
        />
      )}
      {lostPw && (
        <PasswordChangeForm setLostPw={setLostPw} email={data.data.email} />
      )}
    </MyInfoContainer>
  );
};

export default MyInfoForm;
