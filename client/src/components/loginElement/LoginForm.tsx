import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Oauth from "./Oauth";
import {
  InputContainer,
  LoginButtonOn,
  LoginButtonOff,
  LostPassword,
  SignUpMove,
  LoginInput,
  LogoImg,
} from "./LoginForm.style";

type Inputs = {
  email: string;
  password: string;
};

const LoginForm: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<boolean>(false); //아아디,비밀번호가 입력돼었으면 true
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");

  const { register, handleSubmit } = useForm<Inputs>();

  useEffect(() => {
    if (id && pw) {
      setLoginInfo(true);
    } else {
      setLoginInfo(false);
    }
  }, [id, pw]);

  const handleId = (value: string) => {
    const idValue = value;
    setId(idValue);
  };
  const handlePw = (value: string) => {
    const pwValue = value;
    setPw(pwValue);
  };
  return (
    <>
      <InputContainer>
        <LogoImg>로고</LogoImg>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
          <LoginInput
            type="text"
            placeholder="이메일을 입력하세요."
            {...register("email")}
            onChange={(e) => {
              handleId(e.target.value);
            }}
          />
          <LoginInput
            type="password"
            placeholder="비밀번호를 입력하세요."
            {...register("password")}
            onChange={(e) => {
              handlePw(e.target.value);
            }}
          />
          <LostPassword>비밀번호를 잊으셨나요?</LostPassword>
          {loginInfo ? (
            <LoginButtonOn type="submit">로그인</LoginButtonOn>
          ) : (
            <LoginButtonOff>로그인</LoginButtonOff>
          )}
        </form>
        <div>
          <Oauth />
          <p>
            계정이 없으신가요?{" "}
            <Link to="/SignUp">
              <SignUpMove>가입하기</SignUpMove>
            </Link>
          </p>
        </div>
      </InputContainer>
    </>
  );
};

export default LoginForm;
