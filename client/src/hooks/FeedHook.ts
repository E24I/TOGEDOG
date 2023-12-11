import { useMutation, useQuery } from "@tanstack/react-query";
import { getFeeds, getFeed, postFeed } from "../services/feedService";
import { postInformationType } from "../types/feedDataType";

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

export const usePostFeed = (postInformation: postInformationType) => {
  return useMutation({
    mutationFn: async () => {
      postFeed(postInformation);
    },
    onSuccess: () => {
      return;
    },
    onError: () => {
      return;
    },
  });
};
