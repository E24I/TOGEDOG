import React from "react";
import LoginForm from "../components/loginElement/LoginForm";
import {
  LoginContainer,
  MainContainer,
  MainImage,
  MainPicture,
  MainPictures,
} from "../components/loginElement/LoginForm.style";

const Login: React.FC = () => {
  return (
    <LoginContainer>
      <MainContainer>
        <MainPictures>
          {[0, 1, 2, 3, 4, 5].map((_, idx) => (
            <MainPicture key={idx}>
              <MainImage />
            </MainPicture>
          ))}
        </MainPictures>
      </MainContainer>
      <MainContainer>
        <MainPictures top="-129px">
          {[6, 7, 8, 9, 10, 11].map((_, idx) => (
            <MainPicture key={idx}>
              <MainImage />
            </MainPicture>
          ))}
        </MainPictures>
      </MainContainer>
      <LoginForm />
    </LoginContainer>
  );
};

export default Login;
