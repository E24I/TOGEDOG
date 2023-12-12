import axios from "axios";
import { ROOT_URL } from "./api";

// 대댓글 조회
export const getComments = async (replyId: number) => {
  const { data } = await axios.get(`${ROOT_URL}/comments/reply/${replyId}`);
  return data;
};

// 대댓글 등록
export const postComment = async (replyId: number, content: string) => {
  const { data } = await axios.post(`${ROOT_URL}/replies/${replyId}/comment`, {
    content,
  });
  return data;
};

// 대댓글 수정
export const patchComment = async (commentId: number, content: string) => {
  const { data } = await axios.patch(`${ROOT_URL}/comments/${commentId}`, {
    content,
  });
  return data;
};

// 대댓글 삭제
export const deleteComment = async (commentId: number) => {
  const { data } = await axios.delete(`${ROOT_URL}/comments/${commentId}`);
  return data;
};

// 대댓글 신고
export const reportComment = async (commentId: number) => {
  const { data } = await axios.post(`${ROOT_URL}/comments/${commentId}/report`);
  return data;
};
