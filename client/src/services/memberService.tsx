import axios from "axios";
import {
  InfoProps,
  signUpInfoProps,
  authenticationProps,
  nicknameProps,
} from "../types/memberType";
const ROOT_URL = process.env.REACT_APP_ROOT_URL;

// 로그인
export const postLogin = async (requestObj: InfoProps) => {
  const url = `${ROOT_URL}/auth/login`;
  const res = await axios.post(url, requestObj);
  return res;
};

// 회원가입
export const postSignUp = async (requestObj: signUpInfoProps) => {
  const url = `${ROOT_URL}/member/signup`;
  const res = await axios.post(url, requestObj);
  return res;
};

// 인증코드 이메일로 받기
export const postEmail = async (email: string) => {
  const url = `${ROOT_URL}/member/signup/emails/send-code?email=${email}`;
  const res = await axios.post(url);
  return res;
};

// 인증하기
export const postCode = async (requestObj: authenticationProps) => {
  const url = `${ROOT_URL}/member/signup/emails/check`;
  const res = await axios.post(url, requestObj);
  return res;
};

// 닉네임 중복확인
export const postNickname = async (requestObj: nicknameProps) => {
  const url = `${ROOT_URL}/member/signup/nickname/check?n=${requestObj.nickname}`;
  const res = await axios.post(url);
  return res;
};

// google 로그인
export const googleLoginAPI = async (access_token: string) => {
  const url = `${ROOT_URL}/oauth/login/google`;
  const data = { token: access_token };
  const res = await axios.post(url, data);
  return res;
};
