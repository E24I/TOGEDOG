import { styled } from "styled-components";
import { ReactComponent as BackSpace } from "../../../assets/images/icons/Backspace.svg";

export const ProfileForm = styled.div`
  width: 1440px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding-top: 50px;
  textarea {
    border: 1px solid #d7d7d7;
  }
`;
export const Form = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TopBox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
`;
export const HeadText = styled.h2`
  margin: 0 auto;
`;
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
`;
export const ImgInfo = styled.div`
  width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  textarea {
    width: 100%;
    height: 100px;
  }
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

export const DeleteButton = styled.button`
  border-radius: 10px;
  background: #d7d7d7;
  width: 200px;
  height: 50px;
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

export const CategoryForm = styled.div`
  display: flex;
  margin-bottom: 60px;
  align-items: center;
  h3 {
    margin: 0 15px 0 0px;
  }
  input {
    width: 85%;
    border: 1px solid #d7d7d7;
    height: 100%;
    border-radius: 5px;
    font-size: 16px;
  }
`;
