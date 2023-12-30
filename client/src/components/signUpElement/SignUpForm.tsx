import React, { useState } from "react";
import { Link } from "react-router-dom";
import Oauth from "../loginElement/Oauth";
import SignUpInputs from "./SignUpInputs";
import { SignUpBox, Head, BottomText, Logo } from "./SignUpForm.style";

const SignUpForm: React.FC = () => {
  return (
    <SignUpBox>
      <Head>
        <h1>Welcome!</h1>
        <Logo />
      </Head>
      <SignUpInputs />
      <div>
        <Oauth />
        <BottomText>
          이미 계정이 있으신가요?{" "}
          <Link to="/">
            <button>로그인</button>
          </Link>
        </BottomText>
      </div>
    </SignUpBox>
  );
};

export default SignUpForm;
