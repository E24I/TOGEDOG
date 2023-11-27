import axios from "axios";
import { useNavigate } from "react-router";

export const LoginApiCall = async (data?: object) => {
  const navigate = useNavigate();
  try {
    const headers = {
      "ngrok-skip-browser-warning": "1",
    };
    const response = await axios.post(
      "https://0709-116-125-236-74.ngrok-free.app/auth/login",
      data,
      { headers: headers },
    );
    if (response.status === 200) {
      console.log(console.log("성공"));
      navigate("/feeds");
      // response.data.access_token
    }
  } catch (err) {
    console.log(err);
  }
};
