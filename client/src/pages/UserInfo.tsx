import React from "react";
import { styled } from "styled-components";
import UserInfoForm from "../components/userInfo/UserInfoForm";
import UserFeedForm from "../components/userInfo/UserFeedForm";
import { useParams } from "react-router-dom";

const MyPageContainer = styled.div`
  margin: 0 auto;
  width: 1188px;
`;

const MyPage = () => {
  const { pageMemberId } = useParams<{ pageMemberId: string }>();
  return (
    <MyPageContainer>
      <UserInfoForm pageMemberId={pageMemberId} />
      <UserFeedForm pageMemberId={pageMemberId} />
    </MyPageContainer>
  );
};

export default MyPage;
