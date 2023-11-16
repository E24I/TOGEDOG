import React from "react";
import { styled } from "styled-components";
import MyInfoForm from "../components/myPage/MyInfoForm";
import MyFeedForm from "../components/myPage/MyFeedForm";

const MyPageContainer = styled.div`
  margin: 0 auto;
  width: 1188px;
`;

const MyPage = () => {
  return (
    <MyPageContainer>
      <MyInfoForm />
      <MyFeedForm />
    </MyPageContainer>
  );
};

export default MyPage;
