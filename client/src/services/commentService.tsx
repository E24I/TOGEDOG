import axios from "axios";
const ROOT_URL = process.env.REACT_APP_ROOT_URL;

// 대댓글 조회
export const getComments = async (replyId: number, page: number) => {
  const { data } = await axios.get(
    `${ROOT_URL}/comments/reply/${replyId}?page=${page}`,
  );
  return data;
};

// 대댓글 등록
export const postComment = async (
  replyId: number,
  content: string,
  accesstoken: string,
) => {
  const { data } = await axios.post(
    `${ROOT_URL}/replies/${replyId}/comment`,
    { content },
    {
      headers: { Authorization: accesstoken },
    },
  );
  return data;
};

// 대댓글 수정
export const patchComment = async (
  commentId: number,
  content: string,
  accesstoken: string,
) => {
  const { data } = await axios.patch(
    `${ROOT_URL}/comments/${commentId}`,
    { content },
    {
      headers: { Authorization: accesstoken },
    },
  );
  return data;
};

// 대댓글 삭제
export const deleteComment = async (commentId: number, accesstoken: string) => {
  const { data } = await axios.delete(`${ROOT_URL}/comments/${commentId}`, {
    headers: { Authorization: accesstoken },
  });
  return data;
};

// 대댓글 신고
export const reportComment = async (
  commentId: number,
  content: string,
  accesstoken: string,
) => {
  const { data } = await axios.post(
    `${ROOT_URL}/comments/${commentId}/report`,
    { content },
    {
      headers: { Authorization: accesstoken },
    },
  );
  return data;
};
