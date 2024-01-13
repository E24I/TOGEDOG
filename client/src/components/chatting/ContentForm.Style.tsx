import styled from "styled-components";

//componenets
export const ContentForm = styled.div`
  height: fit-content;
`;

export const Date = styled.div`
  font-size: 20px;
  text-align: center;
  margin-top: 50px;
  color: #6e6e6e;
`;

export const ContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
`;

export const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  min-width: fit-content; //대화 내용 길이 임시
  max-width: 300px; //대화 내용 길이 임시
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

export const BottomDiv = styled.div<{ time?: string }>`
  position: absolute;
  display: flex;
  flex-direction: row;
  ${(props) => props["time"] === "my" && "right"}:0px;
  margin-top: 6px;
  font-size: 8px;
  color: #6e6e6e;
`;

export const Time = styled.div``;

export const NoContents = styled.p`
  position: absolute;
  top: 50%;
  left: 45%;
`;
