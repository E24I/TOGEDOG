//api 통신
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ID = process.env.REACT_APP_SGIS_ID;
const KEY = process.env.REACT_APP_SGIS_SECRET_KEY;

//액세스 토큰
export const GetAccessToken = async (): Promise<string> => {
  return await axios
    .get(
      `/OpenAPI3/auth/authentication.json?consumer_key=${ID}&consumer_secret=${KEY}`,
    )
    .then((res) => {
      return res.data.result.accessToken;
    });
};

//광역 단위 행정구역 정보 받기

//쿼리제어
export const CityData = () => {
  const { isLoading, data } = useQuery({
    queryKey: ["city"],
    queryFn: () =>
      GetAccessToken().then((res) => {
        return axios.get(`/OpenAPI3/addr/stage.json?accessToken=${res}`);
      }),
    staleTime: 3600 * 4000,
  });
  if (isLoading) {
    return "데이터 로딩중";
  }
  return data;
};
