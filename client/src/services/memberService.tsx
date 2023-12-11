import axios from "axios";
import {
  InfoProps,
  signUpInfoProps,
  authenticationProps,
  nicknameProps,
} from "../types/memberType";

// 로그인
export const postLogin = async (requestObj: InfoProps) => {
  const url = "http://15.165.78.7:8080/auth/login";
  const res = await axios.post(url, requestObj);
  return res;
};

// 회원가입
export const postSignUp = async (requestObj: signUpInfoProps) => {
  const url = "http://15.165.78.7:8080/member/signup";
  const res = await axios.post(url, requestObj);
  return res;
};

// 인증코드 이메일로 받기
export const postEmail = async (email: string) => {
  const url = `http://15.165.78.7:8080/member/signup/emails/send-code?email=${email}`;
  const res = await axios.post(url);
  return res;
};

// 인증하기
export const postCode = async (requestObj: authenticationProps) => {
  const url = "http://15.165.78.7:8080/member/signup/emails/check";
  const res = await axios.post(url, requestObj);
  return res;
};

// 닉네임 중복확인
export const postNickname = async (requestObj: nicknameProps) => {
  const url = `http://15.165.78.7:8080/member/signup/nickname/check?n=${requestObj.nickname}`;
  const res = await axios.post(url);
  return res;
};
