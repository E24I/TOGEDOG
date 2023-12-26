import axios from "axios";
import { enrollMapType } from "../types/mapType";
const ROOT_URL = process.env.REACT_APP_ROOT_URL;

export const getPetMap = async (feedId: number) => {
  const response = await axios.get(`${ROOT_URL}/map/content/${feedId}`);
  return response.data;
};

export const postMap = async (enrollMap: enrollMapType) => {
  const res = await axios.post(`${ROOT_URL}/map/content`, enrollMap);
  return res.data;
};
