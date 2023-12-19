import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createNewChat,
  exitARoom,
  getAllMessages,
  getAllRooms,
  reportAMessage,
} from "../services/chatService";
import { createNewChatType } from "../types/chatType";
import { useRecoilValue } from "recoil";
import { memberIdAtom, tokenAtom } from "../atoms";

//채팅 리스트 조회
export const GetAllRoomsQuery = () => {
  const token = useRecoilValue(tokenAtom);
  const memberId = useRecoilValue(memberIdAtom);
  const { data } = useQuery({
    queryKey: ["rooms", token, memberId],
    queryFn: async () => memberId && (await getAllRooms(memberId, token)),
  });
  return data;
};

//특정 채팅방 대화 내용 조회
export const GetAllMessagesQuery = (roomId: number) => {
  const token = useRecoilValue(tokenAtom);
  const { data, isError } = useQuery({
    queryKey: ["messages", roomId, token],
    queryFn: () => getAllMessages(roomId, token),
    // select: (data) => data.toString(),
  });
  if (isError) {
    console.log(isError);
  }
  return data;
};

//채팅방 생성
export const useCreateChattingRoom = (
  participants: createNewChatType,
  token: string | undefined,
) => {
  return useMutation({
    mutationFn: async () => {
      createNewChat(participants, token);
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

//채팅방 나가기
export const useExitRoom = (roomId: number, token: string | undefined) => {
  return useMutation({
    mutationFn: async () => {
      exitARoom(roomId, token);
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

//채팅 신고
export const useReportChat = (roomId: number, token: string | undefined) => {
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
