import axios from "axios";
import { useNavigate } from "react-router";
import { isLoginAtom } from "../atoms";
import { useSetRecoilState } from "recoil";

export const LoginApiCall = async (data?: object) => {
  const navigate = useNavigate();
  const storeTokenInLocalStorage = (token: string) => {
    localStorage.setItem("token", token); // 토큰을 로컬 스토리지에 저장
  };

  //로그인 상태 전환 핸들
  const setLoginState = useSetRecoilState(isLoginAtom);

  try {
    const headers = {
      "ngrok-skip-browser-warning": "1",
    };
    const response = await axios.post(
      "https://0709-116-125-236-74.ngrok-free.app/auth/login",
      data,
      { headers: headers },
    );
    if (response.status === 200) {
      console.log(console.log("성공"));
      storeTokenInLocalStorage(response.data.access_token);
      setLoginState(true);
      navigate("/feeds");
    }
  } catch (err) {
    console.log(err);
  }
};
