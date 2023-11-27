import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";

//회원가입 버튼
export const SignApiCall = async (data: object) => {
  const navigate = useNavigate();
  try {
    const headers = {
      "ngrok-skip-browser-warning": "1",
    };
    const response = await axios.post(
      "https://0709-116-125-236-74.ngrok-free.app/member/signup",
      data,
      { headers: headers },
    );
    if (response.status === 201) {
      console.log("성공");
      navigate("/");
    }
  } catch (err) {
    console.log(err);
  }
};

//인증코드 보내는 버튼
export const getAuthentication = async (email: string) => {
  try {
    const request = await axios({
      method: "post",
      url: `https://0709-116-125-236-74.ngrok-free.app/member/emails/send-code?email=${email}`,
    });
    if (request.status === 200) {
      console.log("인증코드를 보냈습니다.");
    }
  } catch (error) {
    console.log(error);
  }
};

//인증하기 버튼
export const sendAuthentication = async (
  email: string,
  authentication: string,
  setIsAuthentication: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    const data = {
      email: email,
      authentication: authentication,
    };
    const headers = {
      "ngrok-skip-browser-warning": "1",
    };
    const response = await axios.post(
      "https://0709-116-125-236-74.ngrok-free.app/member/emails/check",
      data,
      { headers: headers },
    );
    if (response.status === 200) {
      console.log("성공");
      setIsAuthentication(true);
    }
  } catch (err) {
    console.log(err);
  }
};

//닉네임 중복확인 버튼
export const checkNickName = async (nickName: string) => {
  try {
    const headers = {
      "ngrok-skip-browser-warning": "1",
    };
    const response = await axios.post(
      `https://0709-116-125-236-74.ngrok-free.app/member/name?nick=${nickName}`,
      { headers: headers },
    );
    if (response.status === 200) {
      console.log("성공");
    }
  } catch (err) {
    console.log(err);
  }
};
