import styled from "styled-components";

export const ContentForm = styled.div`
  border: 2px solid #cea1a1; // 구분선 입니다
  &:nth-child(n + 2) {
    margin-top: 60px;
  }
  height: fit-content;
`;

export const Date = styled.div`
  border: 2px solid #5b3a3a; // 구분선 입니다
  font-size: 13px;
  text-align: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 2px solid #b87e7e;
`;

export const Image = styled.img`
  border: 2px solid #5c5151;
  width: 60px;
  height: 60px;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50px; //대화 내용 길이 임시
  max-width: fit-content; //대화 내용 길이 임시
  height: 100%;
  border: 2px solid #c65454;
  margin-left: 11px;
`;

export const UserName = styled.div`
  font-size: 16px;
  border: 2px solid #54c654;
`;

export const Talks = styled.div`
  border: 2px solid #060447;
  height: fit-content;
  margin-left: auto;
`;

export const Talk = styled.p`
  height: fit-content;
  line-height: 25px;
  font-size: 13px;
  border: 2px solid #5854c6;
  padding: 10px 20px;
  margin-top: 11px;
  background-color: #d2c0c0;
  border-radius: 20px;
`;
