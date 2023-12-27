import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
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
import { LoginApiCall } from "../../services/loginService";

const LoginForm: React.FC = () => {
  const [lostPw, setLostPw] = useState<boolean>(false); //비밀번호 변경 모달
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const handleModal = () => {
    setLostPw(!lostPw);
  };

  const loginButton = (data: object) => {
    // window.localStorage.clear();
    LoginApiCall(data);
    // navigate("/feeds");
  };

  return (
    <>
      <InputContainer>
        <LogoImg>로고</LogoImg>
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <LoginInput
            type="text"
            placeholder="이메일을 입력하세요."
            {...register("email", { required: true })}
          />
          <LoginInput
            type="password"
            placeholder="비밀번호를 입력하세요."
            {...register("password", { required: true })}
          />
          <LostPassword onClick={handleModal}>
            비밀번호를 잊으셨나요?
          </LostPassword>
          {lostPw && <PasswordChangeForm setLostPw={setLostPw} />}
          <LoginButtonOn
            type="submit"
            onClick={handleSubmit((data) => {
              LoginApiCall(data);
              // navigate("/feeds");
            })}
          >
            로그인
          </LoginButtonOn>
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
