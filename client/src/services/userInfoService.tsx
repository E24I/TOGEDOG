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
export const patchUserIntro = async (memberId: number, token?: string) => {
  const headers = {
    headers: {
      Authorization: token,
    },
  };
  const url = `http://15.165.78.7:8080/member/${memberId}`;
  const res = await axios.get(url, headers);
  return res;
};
