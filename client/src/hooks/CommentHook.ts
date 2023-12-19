import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getComments,
  postComment,
  patchComment,
  deleteComment,
  reportComment,
} from "../services/commentService";
import { queryClient } from "..";

// 대댓글 조회
export const useGetComments = (replyId: number) => {
  return useQuery({
    queryKey: ["comment", replyId],
    queryFn: async () => {
      const response = await getComments(replyId);
      return response.data;
    },
  });
};

// 대댓글 등록
export const usePostComment = (
  replyId: number,
  content: string,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return postComment(replyId, content, accesstoken);
    },
    onSuccess: (res) => {
      console.log(res);
      alert("대댓글 등록 완료");
      queryClient.invalidateQueries({ queryKey: ["comment"] });
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      console.log(err);
      alert("대댓글 등록 실패");
      failFunc && failFunc();
      return;
    },
  });
};

// 대댓글 수정
export const usePatchComment = (
  replyId: number,
  content: string,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return patchComment(replyId, content, accesstoken);
    },
    onSuccess: (res) => {
      console.log(res);
      alert("대댓글 수정 완료");
      queryClient.invalidateQueries({ queryKey: ["comment"] });
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      console.log(err);
      alert("대댓글 수정 실패");
      failFunc && failFunc();
      return;
    },
  });
};

// 대댓글 삭제
export const useDeleteComment = (replyId: number, accesstoken: string) => {
  return useMutation({
    mutationFn: async () => {
      return deleteComment(replyId, accesstoken);
    },
    onSuccess: (res) => {
      console.log("성공", res);
      queryClient.invalidateQueries({ queryKey: ["comment"] });
      return;
    },
    onError: (err) => {
      console.log("실패", err);
      return;
    },
  });
};

// 대댓글 신고
export const useReportComment = (replyId: number, accesstoken: string) => {
  return useMutation({
    mutationFn: async () => {
      return reportComment(replyId, accesstoken);
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
