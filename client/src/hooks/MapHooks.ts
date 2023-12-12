import { useMutation } from "@tanstack/react-query";
import { enrollMapType } from "../types/mapType";
import { postMap } from "../services/mapService";

//맵 좌표 등록
export const usePostMap = (enrollMap: enrollMapType) => {
  return useMutation({
    mutationFn: async () => {
      postMap(enrollMap);
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
