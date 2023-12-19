import axios from "axios";
import {
  postInformationType,
  updateInformationType,
} from "../types/feedDataType";

const ROOT_URL = process.env.REACT_APP_ROOT_URL;

// 피드 전체 조회
export const getFeeds = async () => {
  const { data } = await axios.get(`${ROOT_URL}/feed`);
  return data;
};

// 피드 단일 조회
export const getFeed = async (feedId: number, accesstoken: string) => {
  const { data } = await axios.get(`${ROOT_URL}/feed/${feedId}`, {
    headers: { Authorization: accesstoken },
  });
  return data;
};

// 피드 단일 삭제
export const deleteFeed = async (feedId: number, accesstoken: string) => {
  const { data } = await axios.delete(`${ROOT_URL}/feed/${feedId}`, {
    headers: { Authorization: accesstoken },
  });
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
        Authorization: localStorage.getItem("token"),
        "Content-Type": `application/json`,
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
  const res = await axios
    .post(`http://15.165.78.7:8080/presigned-url`, {
      imageName: file,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return res;
};

export const uploadToS3 = async (
  preSinedURL: string,
  file: File | null,
  type: string,
) => {
  const res = await axios.put(preSinedURL, file, {
    headers: { "Content-type": type },
  });
  return res;
};

export const deleteS3 = () => {
  return;
};

// 피드 좋아요
export const feedLike = async (feedId: number, accesstoken: string) => {
  const { data } = await axios.patch(`${ROOT_URL}/${feedId}/like`, null, {
    headers: { Authorization: accesstoken },
  });
  return data;
};

// 피드 북마크
export const feedBookmark = async (feedId: number, accesstoken: string) => {
  const { data } = await axios.patch(`${ROOT_URL}/${feedId}/bookmark`, null, {
    headers: { Authorization: accesstoken },
  });
  return data;
};

// 피드 신고
export const feedReport = async (feedId: number, accesstoken: string) => {
  const { data } = await axios.post(`${ROOT_URL}/${feedId}/report`, null, {
    headers: { Authorization: accesstoken },
  });
  return data;
};
