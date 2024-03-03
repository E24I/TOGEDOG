import axios from "axios";
import { enrollMapType, coordinateType } from "../types/mapType";
const ROOT_URL = process.env.REACT_APP_ROOT_URL;

export const postMap = async (enrollMap: enrollMapType) => {
  const response = await axios.post(`${ROOT_URL}/map/content`, enrollMap);
  return response.data;
};

// 피드 조회 (좌표 사용)
export const getPetMap = async (
  coordinate: coordinateType,
  accesstoken: string,
) => {
  const response = await axios.post(
    `${ROOT_URL}/map/content/coordinate`,
    coordinate,
    {
      headers: { Authorization: accesstoken },
    },
  );
  return response.data;
};
