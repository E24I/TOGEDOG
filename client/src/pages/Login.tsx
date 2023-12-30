import React from "react";
import { styled } from "styled-components";
import LoginForm from "../components/loginElement/LoginForm";
import { ImgBox } from "../components/loginElement/LoginForm.style";

const LoginContainer = styled.div`
  padding-top: 100px;
  width: 1028px;
  display: flex;
  margin: 0 auto;
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
