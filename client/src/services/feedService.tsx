import axios from "axios";
import {
  postInformationType,
  updateInformationType,
} from "../types/feedDataType";

export const getFeedLists = () => {
  return axios
    .get(`http://15.165.78.7:8080/feed`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const postFeed = async (postInfomation: postInformationType) => {
  const res = await axios.post(
    `/feed`,
    {
      title: postInfomation.title,
      images: postInfomation.images,
      videos: postInfomation.videos,
      content: postInfomation.content,
      state: postInfomation.openYn,
      map: postInfomation.mapYn,
      address: postInfomation.address,
    },
    {
      headers: {
        Authorization: "authorizedToken자리",
      },
    },
  );
  return res;
};

export const updateFeed = async (updateInformation: updateInformationType) => {
  const res = await axios.post(
    `/feed/{feed-id}/reply/{reply-id}`,
    { title: updateInformation.title, content: updateInformation.content },
    {
      headers: {
        Authorization: "authorizedToken자리",
      },
    },
  );
  return res;
};

export const getPresinedUrl = () => {
  // const res = axios.get(``, {});
  // return { presinedUrl: res.data.presinedUrl };
};

export const uploadToS3 = async (
  preSinedURL: string,
  file: string,
  type: string,
) => {
  const res = await axios.put(preSinedURL, {
    file,
    Headers: { "Content-type": type },
  });
  console.log(res);
  return res;
};

export const deleteS3 = () => {
  return;
};
