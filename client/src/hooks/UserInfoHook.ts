import { AxiosResponse, AxiosError } from "axios";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { tokenAtom, isLoginAtom, memberIdAtom, alertAtom } from "../atoms";
import { useNavigate } from "react-router-dom";
import {
  getUserInfo,
  getUserFeed,
  patchUserNickname,
  patchUserIntro,
  postUserEmail,
  postUserCode,
  patchUserPassword,
  getPetInfo,
  deletePetInfo,
  postPetInfo,
  patchPetInfo,
  patchProfileImg,
  deletePetImg,
  deleteUserImage,
} from "../services/userInfoService";
import { createPet, infoType, petIntro } from "../types/userInfoType";
import { queryClient } from "..";

//유저 정보 가져오기
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

// 유저 피드 가져오기 (무한스크롤)
export const useGetUserFeeds = (
  memberId: string | undefined,
  endPoint: string,
) => {
  return useInfiniteQuery({
    queryKey: ["userFeed", memberId, endPoint],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getUserFeed({ memberId, endPoint, pageParam });
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      return allPages[0].pageInfo.totalPages !== 0 &&
        lastPage.pageInfo.page !== allPages[0].pageInfo.totalPages
        ? lastPage.pageInfo.page + 1
        : undefined;
    },
    select: (data) => ({
      pages: data?.pages.map((page) => page.data),
      pageParams: data.pageParams,
    }),
    initialPageParam: 1,
  });
};

// 프로필 이미지 삭제
export const useDeleteUserImage = () => {
  const setAlertModal = useSetRecoilState(alertAtom);
  const token = useRecoilValue(tokenAtom);
  const { mutate } = useMutation({
    mutationFn: async () => {
      await deleteUserImage(token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      setAlertModal("이미지가 삭제 되었습니다.");
    },
    onError: (err: any) => {
      alert(err.response.data.message);
    },
  });
  return { mutate };
};

// 닉네임 변경
export const usePatchUserNickname = (newNickname: string) => {
  const token = useRecoilValue(tokenAtom);
  const setAlertModal = useSetRecoilState(alertAtom);
  const { mutate } = useMutation({
    mutationFn: async () => {
      await patchUserNickname(newNickname, token);
    },
    onSuccess: () => {
      setAlertModal("닉네임이 변경 되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
    onError: (err: any) => {
      setAlertModal(err.response.data.message);
    },
  });
  return { mutate };
};

// 소개글 변경
export const usePatchUserIntro = (newMyIntro: string) => {
  const token = useRecoilValue(tokenAtom);
  const setAlertModal = useSetRecoilState(alertAtom);
  const { mutate } = useMutation({
    mutationFn: async () => {
      patchUserIntro(newMyIntro, token);
    },
    onSuccess: () => {
      setAlertModal("소개글이 변경 되었습니다.");
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return { mutate };
};

// 비밀번호 변경 인증코드 메일보내기
export const usePostUserEmail = (email: string) => {
  const setAlertModal = useSetRecoilState(alertAtom);
  return useMutation({
    mutationFn: async () => {
      return postUserEmail(email);
    },
    onSuccess: () => {
      setAlertModal("이메일로 인증코드를 보내드렸습니다.");
    },
    onError: (err: AxiosError<any>) => {
      console.log(err);
    },
  });
};

// 비밀번호 변경 인증코드 보내기
export const usePostUserCode = (
  email: string,
  authNum: number,
  setCodeCheck: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const setAlertModal = useSetRecoilState(alertAtom);
  return useMutation({
    mutationFn: async () => {
      return postUserCode(email, authNum);
    },
    onSuccess: () => {
      setAlertModal("인증을 완료했습니다.");
      setCodeCheck(true);
    },
    onError: (err: AxiosError<any>) => {
      console.log(err);
    },
  });
};

// 비밀번호 변경하기 버튼
export const usePatchUserPassword = (password: string, pwConfirm: string) => {
  const token = useRecoilValue(tokenAtom);
  const setLoginState = useSetRecoilState(isLoginAtom);
  const setToken = useSetRecoilState(tokenAtom);
  const setMemberId = useSetRecoilState(memberIdAtom);
  const navigate = useNavigate();
  const setAlertModal = useSetRecoilState(alertAtom);
  return useMutation({
    mutationFn: async () => {
      return patchUserPassword(password, pwConfirm, token);
    },
    onSuccess: () => {
      setAlertModal("비밀번호를 변경했습니다. 다시 로그인을 해야 합니다.");
      navigate("/");
      setLoginState(false);
      setToken("");
      setMemberId(undefined);
    },
    onError: (err: AxiosError<any>) => {
      console.log(err);
    },
  });
};

// 펫프로필 정보
export const useGetPetInfo = (petId: string) => {
  const token = useRecoilValue(tokenAtom);
  return useMutation({
    mutationFn: async () => {
      return getPetInfo(petId, token);
    },
    onSuccess: (res) => {
      return res.data;
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

//펫정보 삭제
export const useDeletePetInfo = (petId: string | undefined) => {
  const token = useRecoilValue(tokenAtom);
  const navigator = useNavigate();
  return useMutation({
    mutationFn: async () => {
      if (petId) {
        return deletePetInfo(petId, token);
      }
    },
    onSuccess: () => {
      navigator(-1);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

// 펫 이미지 삭제
export const useDeletePetImg = (petId: number) => {
  const token = useRecoilValue(tokenAtom);
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      deletePetImg(petId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      navigate(-1);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

//펫 등록
export const usePostPet = (requestObj: createPet) => {
  const token = useRecoilValue(tokenAtom);
  const navigator = useNavigate();
  return useMutation({
    mutationFn: async () => {
      return postPetInfo(requestObj, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
      navigator(-1);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

//펫 정보 수정
export const usePatchPetIntro = (petIntro: petIntro, petId: string) => {
  const token = useRecoilValue(tokenAtom);
  return useMutation({
    mutationFn: async () => {
      return patchPetInfo(petIntro, petId, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["petInfo"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};

// 유저 프로필 이미지(사용x)
export const usePatchImg = (imgURL: string) => {
  const token = useRecoilValue(tokenAtom);
  return useMutation({
    mutationFn: async () => {
      return patchProfileImg(imgURL, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
