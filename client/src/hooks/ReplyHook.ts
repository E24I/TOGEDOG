import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deleteReply,
  fixReply,
  getReplies,
  likeReply,
  patchReply,
  postReply,
  reportReply,
} from "../services/replyService";
import { queryClient } from "..";

// 댓글 조회
export const useGetReplies = (feedId: number) => {
  return useQuery({
    queryKey: ["Replies", feedId],
    queryFn: async () => getReplies(feedId),
  });
};

// 댓글 등록
export const usePostReply = (
  feedId: number,
  content: string,
  accesstoken: string,
  successFunc: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return postReply(feedId, content, accesstoken);
    },
    onSuccess: (res) => {
      console.log("성공", res);
      successFunc();
      queryClient.invalidateQueries({ queryKey: ["Feed"] });
    },
    onError: (err) => {
      console.log("실패", err);
      return;
    },
  });
};

// 댓글 수정
export const usePatchReply = (
  replyId: number,
  content: string,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return patchReply(replyId, content, accesstoken);
    },
    onSuccess: (res) => {
      console.log(res);
      alert("댓글 수정 완료");
      queryClient.invalidateQueries({ queryKey: ["Feed"] });
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      console.log(err);
      alert("댓글 수정 실패");
      failFunc && failFunc();
      return;
    },
  });
};

// 댓글 삭제
export const useDeleteReply = (replyId: number, accesstoken: string) => {
  return useMutation({
    mutationFn: async () => {
      return deleteReply(replyId, accesstoken);
    },
    onSuccess: (res) => {
      console.log("성공", res);
      queryClient.invalidateQueries({ queryKey: ["Feed"] });
      return;
    },
    onError: (err) => {
      console.log("실패", err);
      return;
    },
  });
};

// 댓글 고정
export const useFixReply = (replyId: number, accesstoken: string) => {
  return useMutation({
    mutationFn: async () => {
      return fixReply(replyId, accesstoken);
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

// 댓글 좋아요
export const useLikeReply = (replyId: number, accesstoken: string) => {
  return useMutation({
    mutationFn: async () => {
      return likeReply(replyId, accesstoken);
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

// 댓글 신고
export const useReportReply = (replyId: number, accesstoken: string) => {
  return useMutation({
    mutationFn: async () => {
      return reportReply(replyId, accesstoken);
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
