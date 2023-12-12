import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getFeeds,
  getFeed,
  postFeed,
  feedLike,
  feedBookmark,
  feedReport,
  updateFeed,
} from "../services/feedService";
import {
  postInformationType,
  updateInformationType,
} from "../types/feedDataType";

// 피드 전체 조회
export const useGetFeeds = () => {
  return useQuery({ queryKey: ["feeds"], queryFn: async () => getFeeds() });
};

// 피드 단일 조회
export const useGetFeed = (feedId: number) => {
  return useQuery({
    queryKey: ["feed", feedId],
    queryFn: async () => getFeed(feedId),
  });
};

// 피드 등록
export const usePostFeed = (
  postInformation: postInformationType,
  token: string | undefined,
) => {
  return useMutation({
    mutationFn: async () => {
      postFeed(postInformation, token);
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

// 피드 수정
export const useUpdateFeed = (
  updateInformation: updateInformationType,
  token: string | undefined,
) => {
  return useMutation({
    mutationFn: async () => {
      updateFeed(updateInformation, token);
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
export const useFeedLike = (feedId: number) => {
  return useMutation({
    mutationFn: async () => {
      feedLike(feedId);
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

// 피드 북마크
export const useFeedBookmark = (feedId: number) => {
  return useMutation({
    mutationFn: async () => {
      feedBookmark(feedId);
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

// 피드 신고
export const useFeedReport = (feedId: number) => {
  return useMutation({
    mutationFn: async () => {
      feedReport(feedId);
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
