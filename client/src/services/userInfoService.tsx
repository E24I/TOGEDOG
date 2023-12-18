import axios from "axios";

// 유저 정보 가져오기
export const getUserInfo = async (memberId: number, token?: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  const url = `http://15.165.78.7:8080/member/${memberId}`;
  const res = await axios.get(url, headers);
  return res;
};

// 유저 피드 가져오기
export const getUserFeed = async (
  memberId: number,
  endPoint: string,
  token?: string,
) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  const url = `http://15.165.78.7:8080/member/${memberId}/${endPoint}`;
  const res = await axios.get(url, headers);
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
  const url = `http://15.165.78.7:8080/member/update/nickname`;
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
  const url = "http://15.165.78.7:8080/meer/update/myintro";
  const res = await axios.patch(url, intro, headers);
  return res;
};

// 비밀번호 변경 인증코드 메일보내기
export const postUserEmail = async (email: string) => {
  const url = `http://15.165.78.7:8080/member/find/emails/send-code?email=${email}`;
  const res = await axios.post(url);
  return res;
};

// 비밀번호 변경 인증코드 보내기
export const postUserCode = async (email: string, authNum: number) => {
  const requestObj = { email: email, authNum: authNum };
  const url = "http://15.165.78.7:8080/member/find/emails/check";
  const res = await axios.post(url, requestObj);
  return res;
};

// 비밀번호 변경하기 버튼
export const patchUserPassword = async (
  password: string,
  pwConfirm: string,
) => {
  const requestObj = { password: password, pwConfirm: pwConfirm };
  const url = "http://15.165.78.7:8080/member/update/password";
  const res = await axios.patch(url, requestObj);
  return res;
};

// 펫프로필 정보
export const getPetInfo = async (
  petId: string,
  memberId: number,
  token?: string,
) => {
  const headers = {
    headers: { Authorization: token },
  };
  const url = `http://15.165.78.7:8080/pet/${petId}/member/${memberId}`;
  const res = await axios.get(url, headers);
  return res;
};

// 펫정보 삭제
export const deletePetInfo = async (petId: string, token?: string) => {
  const headers = {
    headers: { Authorization: token },
  };
  const url = `http://15.165.78.7:8080/pet/${petId}/delete`;
  const res = await axios.delete(url, headers);
  return res;
};
