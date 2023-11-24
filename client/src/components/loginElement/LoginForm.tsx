import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import Oauth from "./Oauth";
import PasswordChangeForm from "../myPage/infoChangeComponent/PasswordChange";
import {
  InputContainer,
  LoginButtonOn,
  LoginButtonOff,
  LostPassword,
  SignUpMove,
  LoginInput,
  LogoImg,
} from "./LoginForm.style";

const LoginForm: React.FC = () => {
  const [loginInfo, setLoginInfo] = useState<boolean>(false); //아아디,비밀번호가 입력돼었으면 true
  const [id, setId] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [lostPw, setLostPw] = useState<boolean>(false); //비밀번호 변경 모달

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

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
  const handleModal = () => {
    setLostPw(!lostPw);
  };
  const TestApiCall = async (data: object) => {
    try {
      const headers = {
        "ngrok-skip-browser-warning": "1",
      };
      const response = await axios.post(
        "https://0709-116-125-236-74.ngrok-free.app/auth/login",
        data,
        { headers: headers },
      );
      if (response.status === 200) {
        console.log(console.log("성공"));
        navigate("/feeds");
        // response.data.access_token
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <InputContainer>
        <LogoImg>로고</LogoImg>
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
            TestApiCall(data);
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
          <LostPassword onClick={handleModal}>
            비밀번호를 잊으셨나요?
          </LostPassword>
          {lostPw && <PasswordChangeForm setLostPw={setLostPw} />}
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
