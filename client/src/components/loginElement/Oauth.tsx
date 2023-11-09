import React from "react";
import { styled } from "styled-components";
import { ReactComponent as KakaoIcon } from "../../assets/images/icons/KakaoIcon.svg";
import { ReactComponent as GoogleIcon } from "../../assets/images/icons/GoogleIcon.svg";
import { ReactComponent as NaverIcon } from "../../assets/images/icons/NaverIcon.svg";

export const OauthContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const Kakao = styled(KakaoIcon)``;
export const Google = styled(GoogleIcon)``;
export const Naver = styled(NaverIcon)``;

export const OauthLogin = () => {
  return (
    <OauthContainer>
      <Kakao />
      <Google />
      <Naver />
    </OauthContainer>
  );
};

export default OauthLogin;
