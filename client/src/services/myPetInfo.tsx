import axios from "axios";

// 펫 프로필 조회
export const getInfo = async (petid: number) => {
  try {
    const memberId = window.localStorage.getItem("memberId");
    const token = window.localStorage.getItem("token");
    const headers = {
      Authorization: `${token}`,
    };
    const response = await axios.get(
      `http://15.165.78.7:8080/member/${memberId}/pet/${petid}`,
      { headers: headers },
    );
    const data = response.data;
    return console.log(data);
  } catch (err) {
    console.log(err);
  }
};
