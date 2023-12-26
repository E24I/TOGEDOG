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
`;

//프로필 래핑
export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 220px;
  justify-content: space-between;
  margin-left: 20px;
  border: 2px solid #9876e3; //구분선 입니다
`;

export const ProfileImg = styled.div`
  width: 60px;
  height: 60px;
  background-color: #d8d8d8;
  border-radius: 200px;
  text-align: center;
`;

export const Username = styled.div``;

export const CreateTitleWrap = styled.div`
  height: 100%;
  width: 100%;
  border-bottom: 1px solid #d7d7d7;
`;

export const CreateTitle = styled.input`
  width: 100%;
  display: block;
  padding: 20px 15px;
`;
export const Alert = styled.p`
  margin-left: 20px;
  font-size: 10px;
  color: red;
  padding-bottom: 10px;
`;

//본문 입력 공간 래핑
export const CreateContentWrap = styled.div``;

export const TextCount = styled.p`
  text-align: right;
  margin-bottom: 30px;
`;
