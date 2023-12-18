import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getFeeds,
  getFeed,
  postFeed,
  feedLike,
  feedBookmark,
  feedReport,
} from "../services/feedService";
import { postInformationType } from "../types/feedDataType";

// 피드 전체 조회
export const useGetFeeds = () => {
  return useQuery({
    queryKey: ["Feeds"],
    queryFn: async () => {
      const response = await getFeeds();
      return response.data;
    },
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

// 피드 등록
export const usePostFeed = (postInformation: postInformationType) => {
  return useMutation({
    mutationFn: async () => {
      postFeed(postInformation);
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
export const useFeedLike = (feedId: number, accesstoken: string) => {
  return useMutation({
    mutationFn: async () => {
      feedLike(feedId, accesstoken);
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
export const useFeedBookmark = (feedId: number, accesstoken: string) => {
  return useMutation({
    mutationFn: async () => {
      feedBookmark(feedId, accesstoken);
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
export const useFeedReport = (feedId: number, accesstoken: string) => {
  return useMutation({
    mutationFn: async () => {
      feedReport(feedId, accesstoken);
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
