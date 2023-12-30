import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Oauth from "./Oauth";
import PasswordChangeForm from "../userInfo/infoChangeComponent/PasswordChange";
import {
  InputContainer,
  LoginButtonOn,
  LostPassword,
  SignUpMove,
  LoginInput,
  YellowLogo,
} from "./LoginForm.style";
import { usePostLogin } from "../../hooks/MemberHook";

const LoginForm: React.FC = () => {
  const [lostPw, setLostPw] = useState<boolean>(false); //비밀번호 변경 모달
  const { register, watch } = useForm();
  const handleModal = () => {
    setLostPw(!lostPw);
  };
  const email = watch("email", "");
  const password = watch("password", "");
  const { mutate } = usePostLogin({ email, password });

  const handleLogin = () => {
    if (!email || !password) {
      alert("이메일과 비밀번호를 입력하세요.");
      return;
    }
    mutate();
  };

  return (
    <>
      <InputContainer>
        <YellowLogo />
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
          <LoginButtonOn onClick={handleLogin}>Login</LoginButtonOn>
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
