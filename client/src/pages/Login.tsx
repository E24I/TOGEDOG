import React from "react";
import LoginForm from "../components/loginElement/LoginForm";
import {
  LoginContainer,
  MainContainer,
  MainImage,
  MainPicture,
  MainPictures,
} from "../components/loginElement/LoginForm.style";
import Dog1 from "../assets/images/animals/dog/Dog1.svg";
import Dog2 from "../assets/images/animals/dog/Dog2.svg";
import Dog3 from "../assets/images/animals/dog/Dog3.svg";
import Dog4 from "../assets/images/animals/dog/Dog4.svg";
import Dog5 from "../assets/images/animals/dog/Dog5.svg";
import Dog6 from "../assets/images/animals/dog/Dog6.svg";
import Dog7 from "../assets/images/animals/dog/Dog7.svg";

const Login: React.FC = () => {
  return (
    <LoginContainer>
      <MainContainer>
        <MainPictures>
          {[Dog1, Dog2, Dog3].map((el, idx) => (
            <MainPicture key={idx}>
              <MainImage src={el} alt="멍멍이 사진" />
            </MainPicture>
          ))}
        </MainPictures>
      </MainContainer>
      <MainContainer>
        <MainPictures top="-129px">
          {[Dog4, Dog5, Dog6, Dog7].map((el, idx) => (
            <MainPicture key={idx}>
              <MainImage src={el} alt="멍멍이 사진" />
            </MainPicture>
          ))}
        </MainPictures>
      </MainContainer>
      <LoginForm />
    </LoginContainer>
  );
};

export default Login;
