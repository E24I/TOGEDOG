import axios from "axios";
const ROOT_URL = process.env.REACT_APP_ROOT_URL;

// 댓글 조회 // 현재 존재 x
export const getReplies = async (feedId: number) => {
  const { data } = await axios.get(`${ROOT_URL}/${feedId}`);
  return data;
};

// 댓글 등록
export const postReply = async (feedId: number, content: string) => {
  const { data } = await axios.post(`${ROOT_URL}/${feedId}/reply`, { content });
  return data;
};

// 댓글 수정
export const patchReply = async (replyId: number, content: string) => {
  const { data } = await axios.patch(`${ROOT_URL}/replies/${replyId}`, {
    content,
  });
  return data;
};

// 댓글 삭제
export const deleteReply = async (replyId: number) => {
  const { data } = await axios.delete(`${ROOT_URL}/replies/${replyId}`);
  return data;
};

// 댓글 고정
export const fixReply = async (replyId: number) => {
  const { data } = await axios.patch(`${ROOT_URL}/replies/${replyId}/fix`);
  return data;
};

// 댓글 좋아요
export const likeReply = async (replyId: number) => {
  const { data } = await axios.patch(`${ROOT_URL}/replies/${replyId}/like`);
  return data;
};

// 댓글 신고
export const reportReply = async (replyId: number) => {
  const { data } = await axios.post(`${ROOT_URL}/replies/${replyId}/report`);
  return data;
};
