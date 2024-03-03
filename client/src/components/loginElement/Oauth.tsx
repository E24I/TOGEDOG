import React from "react";
import { useRecoilValue } from "recoil";
import { darkAtom } from "../../atoms";
import { OauthContainer, Kakao, Google, Naver } from "./Oauth.style";
import { useGoogleLogin } from "../../hooks/MemberHook";

export const OauthLogin: React.FC = () => {
  const { mutate: googleLogin } = useGoogleLogin();
  const isDark = useRecoilValue(darkAtom);
  return (
    <OauthContainer isDark={isDark}>
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
