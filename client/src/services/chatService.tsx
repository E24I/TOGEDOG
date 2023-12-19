import axios from "axios";
import { createNewChatType } from "../types/chatType";

const ROOT_URL = process.env.REACT_APP_ROOT_URL;

export const createNewChat = async (
  participants: createNewChatType,
  token: string | undefined,
) => {
  const res = await axios.post(`${ROOT_URL}/chat`, participants, {
    headers: {
      Authorization: token,
    },
  });
  return res;
};

export const getAllRooms = async (memberId: number, token: string) => {
  const res = await axios({
    method: "get",
    url: `${ROOT_URL}/chat`,
    data: { memberId: memberId },
    headers: { Authorization: token },
  });
  return res.data;
};

export const getAllMessages = async (
  roomId: number,
  token: string | undefined,
) => {
  const res = await axios.get(`${ROOT_URL}/chat/${roomId}/message`, {
    headers: { Authorization: token },
  });
  return res;
};

export const exitARoom = async (roomId: number, token: string | undefined) => {
  const res = axios.delete(`${ROOT_URL}/chat/${roomId}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const reportAMessage = async (
  roomId: number,
  token: string | undefined,
) => {
  const res = axios.post(`${ROOT_URL}/chat/${roomId}`, {
    headers: { Authorization: token },
  });
  return res;
};
