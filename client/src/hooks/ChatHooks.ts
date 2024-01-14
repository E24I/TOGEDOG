import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewChat,
  exitARoom,
  getAllMessages,
  getAllRooms,
  reportChat,
  searchUsers,
} from "../services/chatService";
import { createNewChatType } from "../types/chatType";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  chatRoomIdAtom,
  memberIdAtom,
  theOtherMemberIdAtom,
  tokenAtom,
} from "../atoms";
import { queryClient } from "..";
import { getUserInfo } from "../services/userInfoService";
import { useNavigate } from "react-router-dom";

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
export const useCreateChattingRoom = () => {
  const token = useRecoilValue(tokenAtom);
  const myMemberId = useRecoilValue(memberIdAtom);
  const inviteMemberId = useRecoilValue(theOtherMemberIdAtom);
  const setRoomId = useSetRecoilState(chatRoomIdAtom);
  const setInviteMemberId = useSetRecoilState(theOtherMemberIdAtom);
  return useMutation({
    mutationFn: async () => {
      return createNewChat(token, myMemberId, inviteMemberId);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setInviteMemberId(undefined);
      setRoomId(res.data.substring(12));

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
  const setRoomId = useSetRecoilState(chatRoomIdAtom);
  return useMutation({
    mutationFn: async () => {
      return exitARoom(token, roomId);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["rooms"] });
      setRoomId(undefined);
      return;
    },
    onError: (err) => {
      console.log("실패", err);
      return;
    },
  });
};

//채팅 신고
export const useReportChat = (
  reason: string,
  roomId?: number,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  const token = useRecoilValue(tokenAtom);
  const memberId = useRecoilValue(memberIdAtom);

  return useMutation({
    mutationFn: async () => {
      return reportChat(token, reason, memberId, roomId);
    },
    onSuccess: () => {
      alert("채팅 신고 완료");
      successFunc && successFunc();
      return;
    },
    onError: () => {
      alert("채팅 신고 실패");
      failFunc && failFunc();
      return;
    },
  });
};
