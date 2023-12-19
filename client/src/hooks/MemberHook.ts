import { isLoginAtom, tokenAtom, memberIdAtom } from "../atoms";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { AxiosResponse } from "axios";

import {
  postLogin,
  postSignUp,
  postEmail,
  postCode,
  postNickname,
} from "../services/memberService";
import { useMutation } from "@tanstack/react-query";
import {
  InfoProps,
  signUpInfoProps,
  authenticationProps,
  nicknameProps,
} from "../types/memberType";

// 로그인
export const usePostLogin = (requestObj: InfoProps) => {
  const setLoginState = useSetRecoilState(isLoginAtom);
  const setToken = useSetRecoilState(tokenAtom);
  const setMemberId = useSetRecoilState(memberIdAtom);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      return postLogin(requestObj);
    },
    onSuccess: (res: AxiosResponse) => {
      setLoginState(true);
      setToken(res.headers.authorization);
      setMemberId(Number(res.headers.id));
      alert("로그인 완료");
      navigate("/feeds");
    },
    onError: () => {
      alert("이메일과 비밀번호를 확인하세요.");
    },
  });
};

// 회원가입
export const usePostSignUp = (requestObj: signUpInfoProps) => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      return postSignUp(requestObj);
    },
    onSuccess: () => {
      alert("회원가입 완료 완료");
      navigate("/");
    },
    onError: (err: AxiosResponse) => {
      console.log(err);
    },
  });
};

// 인증코드 이메일로 받기
export const usePostEmail = (email: string) => {
  return useMutation({
    mutationFn: async () => {
      return postEmail(email);
    },
    onSuccess: () => {
      alert("인증코드를 메일로 보냈습니다.");
    },
    onError: (err: AxiosResponse) => {
      console.log(err, "실패");
    },
  });
};

// // 인증하기
export const usePostCode = (requestObj: authenticationProps) => {
  return useMutation({
    mutationFn: async () => {
      return postCode(requestObj);
    },
    onSuccess: () => {
      alert("인증완료");
      requestObj.setIsAuthentication(true);
    },
    onError: (err: AxiosResponse) => {
      console.log(err);
    },
  });
};

// 닉네임 중복확인
export const usePostNickname = (requestObj: nicknameProps) => {
  return useMutation({
    mutationFn: async () => {
      return postNickname(requestObj);
    },
    onSuccess: (res) => {
      requestObj.setIsNickName(true);
      res.data === false
        ? alert("사용 가능한 닉네임입니다.")
        : alert("이미 사용중인 닉네임입니다.");
    },
    onError: (err: AxiosResponse) => {
      console.log(err);
    },
  });
};
