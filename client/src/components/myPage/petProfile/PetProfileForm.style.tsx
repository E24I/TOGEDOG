import { styled } from "styled-components";
import { ReactComponent as BackSpace } from "../../../assets/images/icons/Backspace.svg";

export const ProfileForm = styled.div`
  width: 1440px;
  margin: 0 auto;
  padding-top: 50px;
  textarea {
    border: 1px solid #d7d7d7;
  }
`;
export const TopBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
export const HeadText = styled.h2``;
export const BackIcon = styled(BackSpace)``;
export const ModifyButton = styled.button`
  font-size: 20px;
  font-weight: bold;
`;

export const ContentBox = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 450px;
  margin-top: 100px;
  display: flex;
  justify-content: space-around;
`;
export const ImgInfo = styled.div`
  width: 400px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  textarea {
    width: 100%;
    height: 100px;
  }
`;

export const Img = styled.div`
  width: 200px;
  height: 200px;
  background: #d7d7d7;
  border-radius: 50%;
`;
export const NameText = styled.p`
  color: gray;
  margin: 10px 0;
  strong {
    color: black;
  }
`;
export const Introduction = styled.p`
  width: 100%;
  text-align: center;
`;
export const TextInfo = styled.div`
  width: 400px;
`;
export const CategoryBox = styled.div``;

export const IssueListForm = styled.div``;
export const Issues = styled.ul`
  margin: 10px 35px;
  li {
    list-style: circle;
    margin-bottom: 10px;
  }
`;
