import axios from "axios";
const ROOT_URL = process.env.REACT_APP_ROOT_URL;

// 댓글 조회 // 현재 존재 x
export const getReplies = async (
  feedId: number,
  accesstoken: string,
  page: number,
) => {
  const { data } = await axios.get(
    `${ROOT_URL}/replies/feed/${feedId}?page=${page}`,
    {
      headers: { Authorization: accesstoken },
    },
  );
  return data;
};

// 댓글 등록
export const postReply = async (
  feedId: number,
  content: string,
  accesstoken: string,
) => {
  const { data } = await axios.post(
    `${ROOT_URL}/feed/${feedId}/replies`,
    { content },
    {
      headers: { Authorization: accesstoken },
    },
  );
  return data;
};

// 댓글 수정
export const patchReply = async (
  replyId: number,
  content: string,
  accesstoken: string,
) => {
  const { data } = await axios.patch(
    `${ROOT_URL}/replies/${replyId}`,
    {
      content,
    },
    {
      headers: { Authorization: accesstoken },
    },
  );
  return data;
};

// 댓글 삭제
export const deleteReply = async (replyId: number, accesstoken: string) => {
  const { data } = await axios.delete(`${ROOT_URL}/replies/${replyId}`, {
    headers: { Authorization: accesstoken },
  });
  return data;
};

// 댓글 고정
export const fixReply = async (replyId: number, accesstoken: string) => {
  const { data } = await axios.patch(
    `${ROOT_URL}/replies/${replyId}/fix`,
    null,
    {
      headers: { Authorization: accesstoken },
    },
  );
  return data;
};

// 댓글 좋아요
export const likeReply = async (replyId: number, accesstoken: string) => {
  const { data } = await axios.patch(
    `${ROOT_URL}/replies/${replyId}/like`,
    null,
    {
      headers: { Authorization: accesstoken },
    },
  );
  return data;
};

// 댓글 신고
export const reportReply = async (
  replyId: number,
  content: string,
  accesstoken: string,
) => {
  const { data } = await axios.post(
    `${ROOT_URL}/replies/${replyId}/report`,
    { content },
    {
      headers: { Authorization: accesstoken },
    },
  );
  return data;
};
