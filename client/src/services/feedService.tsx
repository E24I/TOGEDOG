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

//피드 등록
export const postFeed = async (
  postInformation: postInformationType,
  token: string,
) => {
  console.log(postInformation);
  const res = await axios.post(`${ROOT_URL}/feed`, postInformation, {
    headers: {
      Authorization: token,
      "Content-Type": `application/json`,
    },
  });
  return res;
};

//피드 수정
export const updateFeed = async (
  updateInformation: updateInformationType,
  token: string,
  feedId: number,
) => {
  const res = await axios.patch(
    `${ROOT_URL}/feed/${feedId}`,
    updateInformation,
    {
      headers: {
        Authorization: token,
      },
    },
  );
  return res;
};

//s3 업로드 경로 요청
export const getPresignedUrl = async (file: string) => {
  const res = await axios
    .post(`${ROOT_URL}/presigned-url`, {
      imageName: file,
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return res;
};

//s3로 첨부파일 업로드
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
