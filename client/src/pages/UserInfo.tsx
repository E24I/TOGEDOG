import React from "react";
import { styled } from "styled-components";
import UserInfoForm from "../components/userInfo/UserInfoForm";
import UserFeedForm from "../components/userInfo/UserFeedForm";
import { useParams } from "react-router-dom";

const MyPageContainer = styled.div`
  margin: 0 auto;
  max-width: 1024px;
  border: 1px solid black;
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
