import axios from "axios";
const ROOT_URL = process.env.REACT_APP_ROOT_URL;

//마이페이지 정보 가져오기
export const getMyInfo = async (memberId: number, token: string) => {
  try {
    const response = await axios.get(`${ROOT_URL}/member/${memberId}`, {
      headers: {
        Authorization: token,
      },
    });
    const data = response.data;
    return console.log(data);
  } catch (err) {
    console.log(err);
  }
};

//회원 탈퇴
export const deleteMember = async () => {
  try {
    const memberId = window.localStorage.getItem("memberId");
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `${token}`,
    };
    const response = await axios.delete(`${ROOT_URL}/member/${memberId}`, {
      headers: headers,
    });
    const data = response.data;
    return console.log(data);
  } catch (err) {
    console.log(err);
  }
};
