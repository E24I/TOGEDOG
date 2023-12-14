import axios from "axios";

// 유저 정보 가져오기
export const getUserInfo = async (memberId: number, token?: string) => {
  const config = {
    headers: {
      Authorization: token,
    },
  };
  const url = `http://15.165.78.7:8080/member/${memberId}`;
  const res = await axios.get(url, config);
  return res;
};
