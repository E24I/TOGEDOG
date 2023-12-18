import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getComments,
  postComment,
  patchComment,
  deleteComment,
  reportComment,
} from "../services/commentService";

// 대댓글 조회
export const useGetReplies = (feedId: number) => {
  return useQuery({
    queryKey: ["comment", feedId],
    queryFn: async () => getComments(feedId),
  });
};

// 대댓글 등록
export const usePostReply = (feedId: number, content: string) => {
  return useMutation({
    mutationFn: async () => {
      return postComment(feedId, content);
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

// 대댓글 수정
export const usePatchReply = (replyId: number, content: string) => {
  return useMutation({
    mutationFn: async () => {
      return patchComment(replyId, content);
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

// 대댓글 삭제
export const useDeleteReply = (replyId: number) => {
  return useMutation({
    mutationFn: async () => {
      return deleteComment(replyId);
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

// 대댓글 신고
export const useReportReply = (replyId: number) => {
  return useMutation({
    mutationFn: async () => {
      return reportComment(replyId);
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
