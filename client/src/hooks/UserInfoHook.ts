import { AxiosResponse } from "axios";
import { getUserInfo } from "../services/userInfoService";
import { useMutation } from "@tanstack/react-query";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../atoms";
import {
  InfoProps,
  signUpInfoProps,
  authenticationProps,
  nicknameProps,
} from "../types/memberType";
import { infoType } from "../types/userInfoType";

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
