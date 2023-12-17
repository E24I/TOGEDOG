import { AxiosResponse, AxiosError } from "axios";
import {
  getUserInfo,
  getUserFeed,
  patchUserNickname,
} from "../services/userInfoService";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../atoms";
import {
  InfoProps,
  signUpInfoProps,
  authenticationProps,
  nicknameProps,
} from "../types/memberType";
import { feedDataType, infoType } from "../types/userInfoType";

// 유저 정보 가져오기
export const useGetUserInfo = (
  memberId: number,
  setUserData: React.Dispatch<React.SetStateAction<infoType | undefined>>,
) => {
  const token = useRecoilValue(tokenAtom);
  return useMutation({
    mutationFn: async () => {
      return getUserInfo(memberId, token);
    },
    onSuccess: (res: AxiosResponse) => {
      setUserData(res.data);
    },
    onError: (err: AxiosResponse) => {
      console.log(err);
    },
  });
};

// 유저 피드 가져오기
export const useGetUserFeed = (
  memberId: number,
  endPoint: string,
  setFeedData: React.Dispatch<React.SetStateAction<feedDataType[] | undefined>>,
) => {
  const token = useRecoilValue(tokenAtom);
  return useMutation({
    mutationFn: async () => {
      return getUserFeed(memberId, endPoint, token);
    },
    onSuccess: (res: AxiosResponse) => {
      setFeedData(res.data.data);
    },
    onError: (err: AxiosResponse) => {
      console.log(err);
    },
  });
};

// 닉네임 변경
export const usePatchUserNickname = (newNickname: string) => {
  const token = useRecoilValue(tokenAtom);
  return useMutation({
    mutationFn: async () => {
      return patchUserNickname(newNickname, token);
    },
    onSuccess: () => {
      alert("닉네임 변경완료");
    },
    onError: (err: AxiosError<any>) => {
      if (err.response !== undefined) {
        alert(err.response.data.message);
        console.log(err.response.data);
      }
    },
  });
};
