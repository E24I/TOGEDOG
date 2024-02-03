import React from "react";
import { useRecoilState } from "recoil";
import { darkAtom } from "../atoms";
import LoginForm from "../components/loginElement/LoginForm";
import {
  LoginContainer,
  MainContainer,
  MainImage,
  LoginTogedog,
  LoginText,
  LoginDog,
  DarkMode,
} from "../components/loginElement/LoginForm.style";

const Login: React.FC = () => {
  const [isDark, setIsDark] = useRecoilState(darkAtom);
  const darkMode = () => {
    setIsDark(!isDark);
  };
  return (
    <LoginContainer isDark={isDark}>
      <MainContainer>
        <MainImage>
          <LoginText />
          <LoginTogedog />
          <LoginDog />
        </MainImage>
        <LoginForm />
      </MainContainer>
      <button onClick={() => darkMode()}>
        <DarkMode isDark={isDark} />
      </button>
    </LoginContainer>
  );
};

export default Login;
