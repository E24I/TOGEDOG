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
