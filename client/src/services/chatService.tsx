import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { createNewChatType } from "../types/chatType";

export const createNewChat = async (memberId: createNewChatType) => {
  const res = await axios.post(
    `https://7540-61-101-53-142.ngrok-free.app/chat`,
    {
      requestMemberId: memberId.requestMemberId,
      inviteMemberId: memberId.inviteMemberId,
    },
    {
      headers: {
        Authorization:
          "BearereyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sImlkIjoxLCJlbWFpbCI6Imxqd3cxMjNAbmF2ZXIuY29tIiwic3ViIjoibGp3dzEyM0BuYXZlci5jb20iLCJleHAiOjE3MDExNjQxNDB9.A9s67ninLGOWY49WmturKat99shXVr9JBM9GcStUAQw",
        "ngrok-skip-browser-warning": 0,
      },
    },
  );
  return res;
};

export const getAllRooms = async () => {
  try {
    const res = await axios.get(
      `https://67ca-61-101-53-142.ngrok-free.app/chat`,
      {
        headers: { Authorization: "" },
      },
    );
    return res.data;
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    throw new Error("데이터 가져오기 실패");
  }
};
export const GetAllRoomsQuery = () => {
  const { data } = useQuery({
    queryKey: ["rooms"],
    queryFn: async () => await getAllRooms(),
  });
  return data;
};

export const getAllMessages = async (roomId: number) => {
  const res = await axios.get(
    `https://67ca-61-101-53-142.ngrok-free.app/chat/${roomId}/message`,
    {
      headers: { Authorization: "" },
    },
  );
  return res;
};
export const GetAllMessagesQuery = (roomId: number) => {
  const { data, isError } = useQuery({
    queryKey: ["messages", roomId],
    queryFn: () => getAllMessages(roomId),
    // select: (data) => data.toString(),
  });
  if (isError) {
    console.log(isError);
  }
  return data;
};

export const exitARoom = async (roomId: number) => {
  const res = axios.delete(
    `https://67ca-61-101-53-142.ngrok-free.app/chat/${roomId}`,
    {
      headers: { Authorization: "" },
    },
  );
  return res;
};

export const reportAMessage = async (roomId: number) => {
  const res = axios.post(
    `https://67ca-61-101-53-142.ngrok-free.app/chat/${roomId}`,
    {
      headers: { Authorization: "" },
    },
  );
  return res;
};
