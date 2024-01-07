/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { createNewChatType } from "../types/chatType";
import { useRecoilValue } from "recoil";
import { memberIdAtom } from "../atoms";

const ROOT_URL = process.env.REACT_APP_ROOT_URL;

//유저 검색
export const searchUsers = async (
  nickname: string,
  token: string,
  pageNumber: number,
): Promise<any> => {
  const res = await axios.get(
    `${ROOT_URL}/member/find?n=${nickname}&page=${pageNumber}`,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};

//채팅방 생성
export const createNewChat = async (
  participants: createNewChatType,
  token: string,
) => {
  const res = await axios.post(`${ROOT_URL}/chat`, participants, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

//모든 채팅방 조회
export const getAllRooms = async (memberId: number, token: string) => {
  const res = await axios.get(`${ROOT_URL}/chat?member-id=${memberId}`, {
    headers: { Authorization: token },
  });
  return res.data;
};

//특정 채팅방의 모든 대화 내용 조회
export const getAllMessages = async (
  token: string,
  pageParam?: number,
  roomId?: number,
) => {
  const res = await axios.get(
    `${ROOT_URL}/chat/${roomId}/message?page_number=${pageParam}&page_size=10`,
    {
      headers: { Authorization: token },
    },
  );
  return res;
};

//채팅방 나가기
export const exitARoom = async (token: string, roomId?: number) => {
  const res =
    roomId &&
    axios.delete(`${ROOT_URL}/chat/${roomId}`, {
      headers: { Authorization: token },
    });
  return res;
};

//채팅 신고
export const reportChat = async (
  token: string,
  reason: string,
  memberId?: number,
  roomId?: number,
) => {
  const res = axios.post(
    `${ROOT_URL}/chat/report`,
    {
      memberId: memberId,
      chatRoomId: roomId,
      content: reason,
    },
    {
      headers: { Authorization: token },
    },
  );
  return res;
};
