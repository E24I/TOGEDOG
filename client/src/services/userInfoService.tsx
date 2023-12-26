import axios from "axios";
import { createPet, petIntro } from "../types/userInfoType";

const ROOT_URL = process.env.REACT_APP_ROOT_URL;

// 유저 정보 가져오기
export const getUserInfo = async (memberId: number, token?: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  const url = `${ROOT_URL}/member/${memberId}`;
  const res = await axios.get(url, headers);
  return res;
};

// 유저 피드 가져오기
export const getUserFeed = async (
  memberId: string | undefined,
  endPoint: string,
  page: number,
) => {
  const url = `${ROOT_URL}/member/${memberId}/${endPoint}?page=${page}`;
  const res = await axios.get(url);
  return res;
};

// 닉네임변경
export const patchUserNickname = async (
  newNickname: string,
  token?: string,
) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  const nickname = { nickname: newNickname };
  const url = `${ROOT_URL}/member/update/nickname`;
  const res = await axios.patch(url, nickname, headers);
  return res;
};

// 소개글 변경
export const patchUserIntro = async (newMyIntro: string, token?: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  const intro = { myIntro: newMyIntro };
  const url = `${ROOT_URL}/member/update/myIntro`;
  const res = await axios.patch(url, intro, headers);
  return res;
};

// 비밀번호 변경 인증코드 메일보내기
export const postUserEmail = async (email: string) => {
  const url = `${ROOT_URL}/member/find/emails/send-code?email=${email}`;
  const res = await axios.post(url);
  return res;
};

// 비밀번호 변경 인증코드 보내기
export const postUserCode = async (email: string, authNum: number) => {
  const requestObj = { email: email, authNum: authNum };
  const url = `${ROOT_URL}/member/find/emails/check`;
  const res = await axios.post(url, requestObj);
  return res;
};

// 비밀번호 변경하기 버튼
export const patchUserPassword = async (
  password: string,
  pwConfirm: string,
) => {
  const requestObj = { password: password, pwConfirm: pwConfirm };
  const url = `${ROOT_URL}/member/update/password`;
  const res = await axios.patch(url, requestObj);
  return res;
};

// 펫프로필 정보
export const getPetInfo = async (petId: string, token?: string) => {
  const headers = {
    headers: { Authorization: token },
  };
  const url = `${ROOT_URL}/pet/${petId}`;
  const res = await axios.get(url, headers);
  return res;
};

// 펫정보 삭제
export const deletePetInfo = async (petId: string, token?: string) => {
  const headers = {
    headers: { Authorization: token },
  };
  const url = `${ROOT_URL}/pet/${petId}/delete`;
  const res = await axios.delete(url, headers);
  return res;
};

// 펫 등록
export const postPetInfo = async (requestObj: createPet, token?: string) => {
  const headers = {
    headers: { Authorization: token },
  };
  const url = `${ROOT_URL}/pet/create`;
  const res = await axios.post(url, requestObj, headers);
  return res;
};

//펫 정보 수정
export const patchPetInfo = async (
  petIntro: petIntro,
  petId: string,
  token: string,
) => {
  const headers = {
    headers: { Authorization: token },
  };
  const url = `${ROOT_URL}/pet/${petId}/update`;
  const res = await axios.patch(url, petIntro, headers);
  return res;
};