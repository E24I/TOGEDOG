import React from "react";
import { styled } from "styled-components";
import { ReactComponent as KakaoIcon } from "../../assets/images/icons/oauthIcons/KakaoIcon.svg";
import { ReactComponent as GoogleIcon } from "../../assets/images/icons/oauthIcons/GoogleIcon.svg";
import { ReactComponent as NaverIcon } from "../../assets/images/icons/oauthIcons/NaverIcon.svg";

export const OauthContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  margin-top: 20px;
  div {
    margin: 20px 0;
  }
`;
export const Kakao = styled(KakaoIcon)``;
export const Google = styled(GoogleIcon)`
  margin: 0 20px;
`;
export const Naver = styled(NaverIcon)``;

export const OauthLogin: React.FC = () => {
  return (
    <OauthContainer>
      <p>또는</p>
      <div>
        <Kakao />
        <Google />
        <Naver />
      </div>
    </OauthContainer>
  );
};

export default OauthLogin;