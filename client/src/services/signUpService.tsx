import axios from "axios";
import React from "react";

//회원가입 버튼
export const SignApiCall = async (info: object): Promise<any> => {
  try {
    const headers = {
      "ngrok-skip-browser-warning": "1",
    };
    const response = await axios.post(
      "https://cb1f-116-125-236-74.ngrok-free.app/member/signup",
      info,
      { headers: headers },
    );
    if (response.status === 201) {
      alert("회원가입 성공");
    }
    return response;
  } catch (err) {
    console.log(err);
  }
};

//인증코드 보내는 버튼
export const getAuthentication = async (email: string) => {
  try {
    const request = await axios({
      method: "post",
      url: `https://cb1f-116-125-236-74.ngrok-free.app/member/signup/emails/send-code?email=${email}`,
    });
    if (request.status === 200) {
      alert("인증코드를 보냈습니다.");
    }
  } catch (error) {
    console.log(error);
  }
};

//인증하기 버튼
export const sendAuthentication = async (
  email: string,
  authentication: number,
  setIsAuthentication: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const data = {
      email: `${email}`,
      authNum: `${authentication}`,
    };
    // const headers = {
    //   "ngrok-skip-browser-warning": "1",
    // };
    const response = await axios.post(
      "https://cb1f-116-125-236-74.ngrok-free.app/member/signup/emails/check",
      data,
      // { headers: headers },
    );
    if (response.status === 200) {
      setIsAuthentication(true);
      console.log("성공");
    }
  } catch (err) {
    console.log(err);
  }
};

//닉네임 중복확인 버튼
export const checkNickName = async (
  nickname: string,
  setIsNickName: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    // const headers = {
    //   "ngrok-skip-browser-warning": "1",
    // };
    const response = await axios.post(
      `https://cb1f-116-125-236-74.ngrok-free.app/member/signup/nickname/check?n=${nickname}`,
      // { headers: headers },
    );
    if (response.data === false) {
      console.log("사용가능");
      setIsNickName(true);
    } else if (response.data === true) {
      console.log("사용불가");
    }
  } catch (err) {
    console.log(err);
  }
};
