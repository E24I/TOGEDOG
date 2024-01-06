import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewChat,
  exitARoom,
  getAllMessages,
  getAllRooms,
  reportAMessage,
  searchUsers,
} from "../services/chatService";
import { createNewChatType } from "../types/chatType";
import { useRecoilValue } from "recoil";
import { memberIdAtom, tokenAtom } from "../atoms";
import { queryClient } from "..";
import { getUserInfo } from "../services/userInfoService";

//유저 검색
export const GetUsersQuery = (
  nickname: string,
  pageNumber: number,
  isSubmit?: boolean,
  userInfo?: string,
) => {
  const token = useRecoilValue(tokenAtom);
  return useQuery({
    queryKey: ["users", nickname, token, pageNumber],
    queryFn: async () => {
      const response = await searchUsers(nickname, token, pageNumber);
      return response;
    },
    enabled: userInfo ? false : !!isSubmit,
  });
};

//채팅방에 참여중인 유저의 프로필 가져오기
export const GetUserInfoQuery = (memberId: number) => {
  const token = useRecoilValue(tokenAtom);
  return useQuery({
    queryKey: ["users", memberId, token],
    queryFn: async () => {
      const response = await getUserInfo(memberId, token);
      return response.data;
    },
  });
};

//채팅 리스트 조회
export const GetAllRoomsQuery = () => {
  const token = useRecoilValue(tokenAtom);
  const memberId = useRecoilValue(memberIdAtom);
  return useQuery({
    queryKey: ["rooms", token, memberId],
    queryFn: async () => {
      const response = await getAllRooms(
        memberId !== undefined ? memberId : 0,
        token,
      );
      return response;
    },
  });
};

// 채팅 내용 무한스크롤
export const useInfiniteGetMessages = (roomId?: number) => {
  const token = useRecoilValue(tokenAtom);
  return useInfiniteQuery({
    queryKey: ["messages", token, roomId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getAllMessages(token, pageParam, roomId);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.data.pageInformation.page !==
        allPages[0].data.pageInformation.totalPage
        ? lastPage.data.pageInformation.page + 1
        : undefined;
    },
    select: (data) => ({
      pages: data?.pages.map((page) => page.data),
      pageParams: data.pageParams,
    }),
    initialPageParam: 1,
  });
};

//채팅방 생성
export const useCreateChattingRoom = (participants: createNewChatType) => {
  const token = useRecoilValue(tokenAtom);
  const memberId = useRecoilValue(memberIdAtom);
  participants.requestMemberId = memberId !== undefined ? memberId : 0;
  return useMutation({
    mutationFn: async () => {
      return createNewChat(participants, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      participants.inviteMemberId = 0;
      return;
    },
    onError: (err) => {
      console.log("실패", err);
      return;
    },
  });
};

//채팅방 나가기
export const useExitRoom = (roomId?: number) => {
  const token = useRecoilValue(tokenAtom);
  return useMutation({
    mutationFn: async () => {
      return exitARoom(token, roomId);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      console.log("성공", res);
      return;
    },
    onError: (err) => {
      console.log("실패", err);
      return;
    },
  });
};

//채팅 신고
export const useReportChat = (roomId: number, token: string) => {
  return useMutation({
    mutationFn: async () => {
      reportAMessage(roomId, token);
    },
    onSuccess: (res) => {
      console.log("성공", res);
      return;
    },
    onError: (err) => {
      console.log("실패", err);
      return;
    },
  });
};
