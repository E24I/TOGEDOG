import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteReply,
  getReplies,
  patchReply,
  postReply,
  reportReply,
} from "../services/replyService";

// 대댓글 조회
export const useGetReplies = (feedId: number) => {
  return useQuery({
    queryKey: ["reply", feedId],
    queryFn: async () => getReplies(feedId),
  });
};

// 대댓글 등록
export const usePostReply = (feedId: number, content: string) => {
  return useMutation({
    mutationFn: async () => {
      return postReply(feedId, content);
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
      return patchReply(replyId, content);
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
      return deleteReply(replyId);
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
      return reportReply(replyId);
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
