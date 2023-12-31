import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  getComments,
  postComment,
  patchComment,
  deleteComment,
  reportComment,
} from "../services/commentService";
import { queryClient } from "..";

// 대댓글 조회
export const useGetComments = (replyId: number, page: number) => {
  return useQuery({
    queryKey: ["comment", replyId, page],
    queryFn: async () => {
      const response = await getComments(replyId, page);
      return response.data;
    },
  });
};

// 댓글 전체 조회 (무한스크롤)
export const useInfiniteGetComments = (replyId: number) => {
  return useInfiniteQuery({
    queryKey: ["comment", replyId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getComments(replyId, pageParam);
      console.log("response", response);
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
      queryClient.invalidateQueries({ queryKey: ["Replies"] });
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
  commentId: number,
  content: string,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return patchComment(commentId, content, accesstoken);
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
export const useDeleteComment = (
  commentId: number,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return deleteComment(commentId, accesstoken);
    },
    onSuccess: (res) => {
      console.log(res);
      alert("대댓글 삭제 완료");
      queryClient.invalidateQueries({ queryKey: ["comment"] });
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      console.log(err);
      alert("대댓글 삭제 실패");
      failFunc && failFunc();
      return;
    },
  });
};

// 대댓글 신고
export const useReportComment = (
  commentId: number | undefined,
  content: string,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      if (commentId) {
        return reportComment(commentId, content, accesstoken);
      }
    },
    onSuccess: (res) => {
      console.log(res);
      alert("대댓글 신고 완료");
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      console.log(err);
      alert("대댓글 신고 실패");
      failFunc && failFunc();
      return;
    },
  });
};
