import React from "react";
import { OauthContainer, Kakao, Google, Naver } from "./Oauth.style";
import { useGoogleLogin, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export const OauthLogin: React.FC = () => {
  // const googleLogin = useGoogleLogin({
  //   onSuccess: async (res) => {
  //     console.log(res);
  //     await axios({
  //       method: "post",
  //       url: "https://4248-220-89-220-245.ngrok-free.app/oauth/login/google",
  //       data: { token: res.access_token },
  //     })
  //       .then((res) => {
  //         console.log(res);
  //       })
  //       .catch((e) => console.log(e));
  //   },
  // });

  return (
    <OauthContainer>
      <p>또는</p>
      <div>
        <Kakao />
        <Google
        // onClick={() => {googleLogin();}}
        />
        {/* <GoogleLogin
          onSuccess={(res) => {
            console.log(res);
          }}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        /> */}
        <Naver />
      </div>
    </OauthContainer>
  );
};

export default OauthLogin;
