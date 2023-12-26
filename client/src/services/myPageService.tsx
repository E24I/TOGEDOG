import axios from "axios";

//마이페이지 정보 가져오기
export const getMyInfo = async (memberId: number) => {
  try {
    const headers = {
      "ngrok-skip-browser-warning": "1",
      //   Authorization: `Bearer ${token}`
    };
    const response = await axios.get(
      `https://0709-116-125-236-74.ngrok-free.app//member/${memberId}`,
      { headers: headers },
    );
    const data = response.data;
    return console.log(data);
  } catch (err) {
    console.log(err);
  }
};
