import axios from "axios";

export const getFeedLists = () => {
  return axios
    .get("")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
};
