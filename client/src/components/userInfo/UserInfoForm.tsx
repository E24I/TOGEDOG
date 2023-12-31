import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { memberIdAtom, tokenAtom } from "../../atoms";
import {
  MyInfoContainer,
  NickName,
  TopContainer,
  Introduction,
  SectionBox,
  ButtonSection,
  Button1,
  Button2,
  PetListBox,
  PetAdd,
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
  const handleInfoModal = () => {
    //모달열기
    setChangeInfo(!changeInfo);
  };
  const handlePasswordModal = () => {
    //모달열기
    setLostPw(!lostPw);
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
      <NickName>{data?.data.nickname}</NickName>
      <TopContainer>
        <UserImgForm
          width={150}
          height={150}
          radius={50}
          URL={data?.data.image}
        />
        <SectionBox>
          <ButtonSection>
            <Button1 onClick={handlePasswordModal}>
              {Number(pageMemberId) === memberId ? "비밀번호 변경" : "메시지"}
            </Button1>
            <Button2 onClick={handleInfoModal}>
              {Number(pageMemberId) === memberId ? "프로필 수정" : "신고하기"}
            </Button2>
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
