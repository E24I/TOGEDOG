import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const createNewChat = async (memberId: number) => {
  const res = await axios.post(`/chat`, {
    memberId: memberId,
    headers: { Authorization: "" },
  });
  return res;
};

export const getAllRooms = async () => {
  const res = axios.get(`/chat`, { headers: { Authorization: "" } });
  return res;
};
export const GetAllRoomsQuery = () => {
  const { data } = useQuery({
    queryKey: ["rooms"],
    queryFn: () => getAllRooms(),
    // select: (data) => data.toString(),
  });
  return data;
};

export const getAllMessages = async (roomId: number) => {
  const res = await axios.get(`/chat/${roomId}`, {
    headers: { Authorization: "" },
  });
  return res;
};
export const GetAllMessagesQuery = (roomId: number) => {
  const { data } = useQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getAllMessages(roomId),
    // select: (data) => data.toString(),
  });
  return data;
};

export const exitARoom = async (roomId: number) => {
  const res = axios.delete(`/chat/${roomId}`, {
    headers: { Authorization: "" },
  });
  return res;
};

export const reportAMessage = async (roomId: number) => {
  const res = axios.post(`/chat/${roomId}`, {
    headers: { Authorization: "" },
  });
  return res;
};
