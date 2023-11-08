import React from "react";
import { styled } from "styled-components";
import LoginForm from "../components/loginElement/LoginForm";

const LoginContainer = styled.div`
  width: 1028px;
`;

const ImgBox = styled.div`
  width: 514px;
  height: 632px;
  background: gray;
  border: 1px solid red;
`;

const Login = () => {
  return (
    <LoginContainer>
      <ImgBox />
      <LoginForm />
    </LoginContainer>
  );
};

export default Login;
