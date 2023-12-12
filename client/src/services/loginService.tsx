import axios from "axios";
import { isLoginAtom } from "../atoms";
import { useSetRecoilState } from "recoil";

export const LoginApiCall = async (info?: object) => {
  const storeTokenInLocalStorage = (token: string) => {
    localStorage.setItem("token", token); // 토큰을 로컬 스토리지에 저장
  };

  //로그인 상태 전환 핸들
  // const setLoginState = useSetRecoilState(isLoginAtom);
  try {
    const response = await axios.post(
      "http://15.165.78.7:8080/auth/login",
      info,
    );
    if (response.status === 200) {
      console.log("성공");
      console.log(response.headers.authorization);
      window.localStorage.clear();
      storeTokenInLocalStorage(response.headers.authorization);
      // setLoginState(true);
    }
  } catch (err) {
    console.log("실패");
  }
};
