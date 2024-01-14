import React from "react";
import { OauthContainer, Kakao, Google, Naver } from "./Oauth.style";
import { useGoogleLogin } from "../../hooks/MemberHook";

export const OauthLogin: React.FC = () => {
  const { mutate: googleLogin } = useGoogleLogin();
  return (
    <OauthContainer>
      <p>또는</p>
      <div>
        <Kakao />
        <Google
          onClick={() => {
            googleLogin();
          }}
        />
        <Naver />
      </div>
    </OauthContainer>
  );
};

export default OauthLogin;
