import styled from "styled-components";

export const CreateSpace = styled.div`
  .custom-quill-container {
    .ql-editor {
      width: 100%;
      height: 100%;
    }
    .ql-editor::before {
      font-style: normal;
    }
  }
  margin-top: 5.5rem;
`;

//프로필 래핑
export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  margin-left: 20px;
  :nth-child(2) {
    margin-left: 15px;
  }
  margin-bottom: 5%;
`;

export const ProfileImg = styled.div`
  width: 60px;
  height: 60px;
  background-color: #d8d8d8;
  border-radius: 200px;
  text-align: center;
`;

export const CreateTitleWrap = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 30px;
  border-bottom: 1px solid #d7d7d7;
`;

export const Title = styled.p`
  margin-bottom: 20px;
  color: #494949;
  font-weight: 500;
`;

export const CreateTitle = styled.input`
  width: 100%;
  display: block;
  padding: 10px 15px;
`;

export const Alert = styled.p`
  margin-left: 20px;
  font-size: 10px;
  color: red;
  padding-bottom: 10px;
`;

//본문 입력 공간 래핑
export const CreateContentWrap = styled.div`
  margin-top: 30px;
  .quill > .ql-container > .ql-editor {
    padding: 10px 15px;
    height: 200px;
  }
`;

export const Content = styled.p<{ length: number }>`
  margin-bottom: 20px;
  color: #494949;
  font-weight: 500;
  span {
    color: ${(props) => (props["length"] > 200 ? "red" : "#494949")};
  }
`;
