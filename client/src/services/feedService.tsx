import axios from "axios";
import { ROOT_URL } from "./api";
import {
  postInformationType,
  updateInformationType,
} from "../types/feedDataType";

// 피드 전체 조회
export const getFeeds = async () => {
  const { data } = await axios.get(`${ROOT_URL}/feed`);
  return data;
};

// 피드 단일 조회
export const getFeed = async (feedId: number) => {
  const { data } = await axios.get(`${ROOT_URL}/feed/${feedId}`);
  return data;
};

// 피드 단일 삭제
export const deleteFeed = async (feedId: number) => {
  const { data } = await axios.delete(`${ROOT_URL}/${feedId}`);
  return data;
};

// 피드 일괄 삭제
export const deleteFeeds = async () => {
  const { data } = await axios.delete(`${ROOT_URL}/delete/all`);
  return data;
};

export const postFeed = async (postInformation: postInformationType) => {
  const res = await axios.post(
    `http://15.165.78.7:8080/feed`,
    postInformation,
    {
      headers: {
        Authorization: "authorizedToken자리",
      },
    },
  );
  return res.data;
};

export const updateFeed = async (updateInformation: updateInformationType) => {
  const res = await axios.post(
    `http://15.165.78.7:8080/feed/{feed-id}/reply/{reply-id}`,
    { title: updateInformation.title, content: updateInformation.content },
    {
      headers: {
        Authorization: "authorizedToken자리",
      },
    },
  );
  return res;
};

export const getPresinedUrl = async (file: string) => {
  const res = await axios.post(`http://15.165.78.7:8080/presigned-url/feed `, {
    imageName: file,
  });
  return res.data;
};

export const uploadToS3 = async (
  preSinedURL: string,
  file: string,
  type: string,
) => {
  const res = await axios.put(preSinedURL, {
    file,
    headers: { "Content-type": type },
  });
  console.log(res);
  return res.data;
};

export const deleteS3 = () => {
  return;
};

// 피드 좋아요
export const feedLike = async (feedId: number) => {
  const { data } = await axios.patch(`${ROOT_URL}/${feedId}/like`);
  return data;
};

// 피드 북마크
export const feedBookmark = async (feedId: number) => {
  const { data } = await axios.patch(`${ROOT_URL}/${feedId}/bookmark`);
  return data;
};

// 피드 신고
export const feedReport = async (feedId: number) => {
  const { data } = await axios.post(`${ROOT_URL}/${feedId}/report`);
  return data;
};
