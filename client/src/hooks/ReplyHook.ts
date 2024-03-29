import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
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

// // 댓글 전체 조회
// export const useGetReplies = (feedId: number, page: number) => {
//   return useQuery({
//     queryKey: ["Replies", feedId, page],
//     queryFn: async () => getReplies(feedId, page),
//   });
// };

// 댓글 전체 조회 (무한스크롤)
export const useInfiniteGetReplies = (feedId: number, accesstoken: string) => {
  return useInfiniteQuery({
    queryKey: ["Replies", feedId, accesstoken],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getReplies(feedId, accesstoken, pageParam);
      return response;
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.pageInformation.page !==
        allPages[0].pageInformation.totalPage
        ? lastPage.pageInformation.page + 1
        : undefined;
    },
    select: (data) => ({
      pages: data?.pages.map((page) => page.data),
      pageParams: data.pageParams,
    }),
    initialPageParam: 1,
  });
};

// 댓글 등록
export const usePostReply = (
  feedId: number,
  content: string,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return postReply(feedId, content, accesstoken);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["Feed"] });
      queryClient.invalidateQueries({ queryKey: ["Replies"] });
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      failFunc && failFunc();
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
      queryClient.invalidateQueries({ queryKey: ["Replies"] });
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      failFunc && failFunc();
      return;
    },
  });
};

// 댓글 삭제
export const useDeleteReply = (
  replyId: number,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return deleteReply(replyId, accesstoken);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["Feed"] });
      queryClient.invalidateQueries({ queryKey: ["Replies"] });
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      failFunc && failFunc();
      return;
    },
  });
};

// 댓글 고정
export const useFixReply = (
  replyId: number,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return fixReply(replyId, accesstoken);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["Replies"] });
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      failFunc && failFunc();
      return;
    },
  });
};

// 댓글 좋아요
export const useLikeReply = (
  replyId: number,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return likeReply(replyId, accesstoken);
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["Replies"] });
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      failFunc && failFunc();
      return;
    },
  });
};

// 댓글 신고
export const useReportReply = (
  replyId: number | undefined,
  content: string,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      if (replyId) {
        return reportReply(replyId, content, accesstoken);
      }
    },
    onSuccess: (res) => {
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      failFunc && failFunc();
      return;
    },
  });
};
