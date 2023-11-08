import React from "react";
import { styled } from "styled-components";

import LoginInput from "../loginElement/LoginInput";

const LoginForm = () => {
  return (
    <>
      <div>로고</div>
      <LoginInput placeholder={"이메일을 입력하세요."} />
      <LoginInput placeholder={"비밀번호를 입력하세요."} />
    </>
  );
};

export default LoginForm;
