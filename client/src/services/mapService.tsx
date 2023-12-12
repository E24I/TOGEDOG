import axios from "axios";
import { enrollMapType } from "../types/mapType";
import { ROOT_URL } from "./api";

export const postMap = async (enrollMap: enrollMapType) => {
  const res = await axios.post(`${ROOT_URL}/map/content`, enrollMap);
  return res.data;
};
