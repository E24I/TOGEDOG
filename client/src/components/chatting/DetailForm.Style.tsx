import styled from "styled-components";

//componenets
export const ContentForm = styled.div`
  &:nth-child(n + 2) {
    margin-top: 60px;
  }
  height: fit-content;
`;

export const Date = styled.div`
  font-size: 13px;
  text-align: center;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 50px; //대화 내용 길이 임시
  max-width: fit-content; //대화 내용 길이 임시
  height: 100%;
  margin-left: 11px;
`;

export const Talks = styled.div<{ data: string }>`
  height: fit-content;
  margin-left: ${(props) => (props["data"] === "my" ? "auto" : 0)};
`;

export const Talk = styled.p`
  height: fit-content;
  line-height: 25px;
  font-size: 13px;
  padding: 10px 20px;
  margin-top: 11px;
  background-color: #ffeaa7;
  border-radius: 20px;
`;
