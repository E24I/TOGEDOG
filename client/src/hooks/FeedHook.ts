import { useQuery, useMutation, useInfiniteQuery } from "@tanstack/react-query";
import {
  getFeeds,
  getFeed,
  postFeed,
  feedLike,
  feedBookmark,
  feedReport,
  updateFeed,
  deleteFeed,
} from "../services/feedService";
import {
  postInformationType,
  updateInformationType,
} from "../types/feedDataType";
import { queryClient } from "..";

// 피드 전체 조회
export const useGetFeeds = (page: number) => {
  return useQuery({
    queryKey: ["Feeds", page],
    queryFn: async () => {
      const response = await getFeeds(page);
      return response.data;
    },
  });
};

// 피드 전체 조회 (무한스크롤)
export const useInfiniteGetFeeds = () => {
  return useInfiniteQuery({
    queryKey: ["Feeds"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getFeeds(pageParam);
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

// 피드 단일 조회
export const useGetFeed = (feedId: number, accesstoken: string) => {
  return useQuery({
    queryKey: ["Feed", feedId, accesstoken],
    queryFn: async () => {
      const response = await getFeed(feedId, accesstoken);
      return response.data;
    },
  });
};

// 피드 단일 삭제
export const useDeleteFeed = (
  feedId: number,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return deleteFeed(feedId, accesstoken);
    },
    onSuccess: (res) => {
      console.log(res);
      alert("피드 삭제 완료");
      queryClient.invalidateQueries({ queryKey: ["Feeds"] });
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      console.log(err);
      alert("피드 삭제 실패");
      failFunc && failFunc();
      return;
    },
  });
};

// 피드 등록
export const usePostFeed = (
  postInformation: postInformationType,
  token: string | undefined,
) => {
  return useMutation({
    mutationFn: async () => {
      return postFeed(postInformation, token);
    },
    onSuccess: (res) => {
      console.log("성공", res);
      queryClient.invalidateQueries({ queryKey: ["Feeds"] });
      return;
    },
    onError: (err) => {
      console.log("실패", err);
      return;
    },
  });
};

// 피드 수정
export const useUpdateFeed = (
  updateInformation: updateInformationType,
  token: string | undefined,
) => {
  return useMutation({
    mutationFn: async () => {
      return updateFeed(updateInformation, token);
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

// 피드 좋아요
export const useFeedLike = (
  feedId: number,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return feedLike(feedId, accesstoken);
    },
    onSuccess: (res) => {
      console.log(res);
      alert("피드 좋아요 성공");
      queryClient.invalidateQueries({ queryKey: ["Feed"] });
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      console.log(err);
      alert("피드 좋아요 실패");
      failFunc && failFunc();
      return;
    },
  });
};

// 피드 북마크
export const useFeedBookmark = (
  feedId: number,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      return feedBookmark(feedId, accesstoken);
    },
    onSuccess: (res) => {
      console.log(res);
      alert("피드 북마크 성공");
      queryClient.invalidateQueries({ queryKey: ["Feed"] });
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      console.log(err);
      alert("피드 북마크 실패");
      failFunc && failFunc();
      return;
    },
  });
};

// 피드 신고
export const useFeedReport = (
  feedId: number | undefined,
  content: string,
  accesstoken: string,
  successFunc?: () => void,
  failFunc?: () => void,
) => {
  return useMutation({
    mutationFn: async () => {
      if (feedId) {
        return feedReport(feedId, content, accesstoken);
      }
    },
    onSuccess: (res) => {
      console.log(res);
      alert("피드 신고 완료");
      successFunc && successFunc();
      return;
    },
    onError: (err) => {
      console.log(err);
      alert("피드 신고 실패");
      failFunc && failFunc();
      return;
    },
  });
};
