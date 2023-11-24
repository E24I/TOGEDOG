import axios from "axios";
import { postInformationType } from "../types/feedDataType";

export const getFeedLists = () => {
  return axios
    .get("")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const postFeed = async (postInfomation: postInformationType) => {
  return await axios
    .post(
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
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};

export const updateFeed = async (content: string) => {
  return await axios
    .post(
      `/feed/{feed-id}/reply/{reply-id}`,
      {
        content: content,
      },
      {
        headers: {
          Authorization: "authorizedToken자리",
        },
      },
    )
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
