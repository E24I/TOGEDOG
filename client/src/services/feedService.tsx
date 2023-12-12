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
