import React from "react";
import { styled } from "styled-components";
import UserInfoForm from "../components/userInfo/UserInfoForm";
import UserFeedForm from "../components/userInfo/UserFeedForm";

const MyPageContainer = styled.div`
  margin: 0 auto;
  width: 1188px;
`;

const MyPage = () => {
  return (
    <MyPageContainer>
      <UserInfoForm />
      <UserFeedForm />
    </MyPageContainer>
  );
};

export default MyPage;
