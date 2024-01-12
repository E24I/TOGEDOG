import { isLoginAtom, tokenAtom, memberIdAtom, alertAtom } from "../atoms";
import { useSetRecoilState } from "recoil";
import { useNavigate } from "react-router";
import { AxiosResponse } from "axios";
import { useGoogleLogin as useGoogleLoginHook } from "@react-oauth/google";
import {
  postLogin,
  postSignUp,
  postEmail,
  postCode,
  postNickname,
  googleLoginAPI,
} from "../services/memberService";
import { useMutation } from "@tanstack/react-query";
import {
  InfoProps,
  signUpInfoProps,
  authenticationProps,
  nicknameProps,
} from "../types/memberType";

// 로그인
export const usePostLogin = (requestObj: InfoProps) => {
  const setLoginState = useSetRecoilState(isLoginAtom);
  const setToken = useSetRecoilState(tokenAtom);
  const setMemberId = useSetRecoilState(memberIdAtom);
  const navigate = useNavigate();
  const setAlertModal = useSetRecoilState(alertAtom);
  return useMutation({
    mutationFn: async () => {
      return postLogin(requestObj);
    },
    onSuccess: (res: AxiosResponse) => {
      setLoginState(true);
      setToken(res.headers.authorization);
      setMemberId(Number(res.headers.id));
      navigate("/feeds");
      setTimeout(() => {
        setAlertModal("30분뒤 로그아웃 후 로그인 페이지로 이동됩니다.");
        setTimeout(() => {
          setLoginState(false);
          setToken("");
          setMemberId(0);
          navigate("/");
        }, 1800000);
      }, 5400000);
    },
    onError: () => {
      setAlertModal("이메일과 비밀번호를 확인하세요.");
    },
  });
};

// 회원가입
export const usePostSignUp = (requestObj: signUpInfoProps) => {
  const navigate = useNavigate();
  const setAlertModal = useSetRecoilState(alertAtom);
  return useMutation({
    mutationFn: async () => {
      return postSignUp(requestObj);
    },
    onSuccess: () => {
      setAlertModal("회원가입 완료 완료");
      navigate("/");
    },
    onError: (err: any) => {
      alert(err.response.data.message);
    },
  });
};

// 인증코드 이메일로 받기
export const usePostEmail = (email: string) => {
  const setAlertModal = useSetRecoilState(alertAtom);
  return useMutation({
    mutationFn: async () => {
      return postEmail(email);
    },
    onSuccess: () => {
      setAlertModal("인증코드를 메일로 보냈습니다.");
    },
    onError: (err: any) => {
      setAlertModal(err.response.data.message);
    },
  });
};

// 인증하기
export const usePostCode = (requestObj: authenticationProps) => {
  const setAlertModal = useSetRecoilState(alertAtom);
  return useMutation({
    mutationFn: async () => {
      return postCode(requestObj);
    },
    onSuccess: () => {
      setAlertModal("인증완료");
      requestObj.setIsAuthentication(true);
    },
    onError: (err: AxiosResponse) => {
      console.log(err);
    },
  });
};

// 닉네임 중복확인
export const usePostNickname = (requestObj: nicknameProps) => {
  const setAlertModal = useSetRecoilState(alertAtom);
  return useMutation({
    mutationFn: async () => {
      return postNickname(requestObj);
    },
    onSuccess: (res) => {
      requestObj.setIsNickName(true);
      res.data === false
        ? setAlertModal("사용 가능한 닉네임입니다.")
        : setAlertModal("이미 사용중인 닉네임입니다.");
    },
    onError: (err: AxiosResponse) => {
      console.log(err);
    },
  });
};

// google 로그인
export const useGoogleLogin = () => {
  const setLoginState = useSetRecoilState(isLoginAtom);
  const setToken = useSetRecoilState(tokenAtom);
  const setMemberId = useSetRecoilState(memberIdAtom);
  const navigate = useNavigate();
  const googleLogin = useGoogleLoginHook({
    onSuccess: async (res) => {
      await googleLoginAPI(res.access_token)
        .then((res) => {
          setLoginState(true);
          setToken(res.headers.authorization);
          setMemberId(Number(res.headers.id));
          navigate("/feeds");
          console.log("구글 로그인 성공");
        })
        .catch((e) => console.log(e));
    },
  });
  return useMutation({
    mutationFn: async () => {
      return googleLogin();
    },
  });
};
