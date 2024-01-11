import React from "react";
import { styled } from "styled-components";
import LoginForm from "../components/loginElement/LoginForm";
import { LoginContainer } from "../components/loginElement/LoginForm.style";

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

export const MainContainer = styled.div`
  width: 260px;
  height: calc(100vh - 70px);
  overflow-y: scroll;
  position: relative;

  // 스크롤바 설정(넓이 등)
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const MainPictures = styled.ul<{ top?: string }>`
  margin-top: ${(props) => props.top && props.top};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const MainPicture = styled.li`
  background-color: rgb(255, 255, 255);
  width: 240px;
  height: 300px;
  margin: 10px 0px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  padding-top: 20px;
`;

export const MainImage = styled.img`
  background-color: rgb(215, 177, 135);
  width: 200px;
  height: 210px;
`;
