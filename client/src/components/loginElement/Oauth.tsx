import React from "react";
import { OauthContainer, Kakao, Google, Naver } from "./Oauth.style";

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
