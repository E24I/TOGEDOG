import React from "react";
import { styled } from "styled-components";
import LoginForm from "../components/loginElement/LoginForm";

const LoginContainer = styled.div`
  padding-top: 100px;
  width: 1028px;
  display: flex;
  margin: 0 auto;
`;

const ImgBox = styled.div`
  width: 514px;
  height: 632px;
  background: gray;
  border-radius: 30px 0 0 30px;
`;

const Login: React.FC = () => {
  return (
    <LoginContainer>
      <ImgBox />
      <LoginForm />
    </LoginContainer>
  );
};

export default Login;
