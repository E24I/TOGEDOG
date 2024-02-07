import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { darkAtom } from "../../atoms";
import Oauth from "./Oauth";
import PasswordChangeForm from "../userInfo/infoChangeComponent/PasswordChange";
import {
  InputContainer,
  LoginButtonOn,
  LostPassword,
  SignUpMove,
  LoginInput,
  UnLogin,
  LoginLogo,
  BottomMenu,
  MobileDarkMode,
} from "./LoginForm.style";
import { usePostLogin } from "../../hooks/MemberHook";

const LoginForm: React.FC = () => {
  const [lostPw, setLostPw] = useState<boolean>(false); //비밀번호 변경 모달
  const { register, watch } = useForm();
  const isDark = useRecoilValue(darkAtom);
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
    <InputContainer isDark={isDark}>
      <MobileDarkMode />
      <LoginLogo />
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <LoginInput
          isDark={isDark}
          type="text"
          placeholder="이메일을 입력하세요."
          {...register("email", { required: true })}
        />
        <LoginInput
          isDark={isDark}
          type="password"
          placeholder="비밀번호를 입력하세요."
          {...register("password", { required: true })}
        />
        {lostPw && <PasswordChangeForm setLostPw={setLostPw} />}
        <LoginButtonOn onClick={handleLogin}>Login</LoginButtonOn>
      </form>
      <Link to="/feeds" className="unLogin">
        <UnLogin isDark={isDark}>비회원으로 시작하기</UnLogin>
      </Link>
      <div>
        <Oauth />
        <BottomMenu>
          <LostPassword onClick={handleModal}>비밀번호 찾기</LostPassword>
          <Link to="/SignUp">
            <SignUpMove>가입하기</SignUpMove>
          </Link>
        </BottomMenu>
      </div>
    </InputContainer>
  );
};

export default LoginForm;
