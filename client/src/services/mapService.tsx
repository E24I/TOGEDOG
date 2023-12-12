import axios from "axios";
import { enrollMapType } from "../types/mapType";

export const enrollMap = async (enrollMap: enrollMapType) => {
  try {
    const res = await axios.post(
      `http://15.165.78.7:8080/map/content`,
      enrollMap,
    );
    return res.data;
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    throw new Error("데이터 가져오기 실패");
  }
};
