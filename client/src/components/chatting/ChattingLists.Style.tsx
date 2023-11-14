import styled from "styled-components";

//chatting whole container
export const ChattingContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ChattingListsContainer = styled.div`
  width: 463px; //임시사이징 입니다
  height: 100vh;
  padding-bottom: 42px; //임시 사이징 입니다
  border-right: 1px solid #d7d7d7;
`;

export const ChattingFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 34px 0 49px;
  border: 2px solid #a05555; //구분선 입니다
  height: 100%;
  overflow: scroll;
`;

export const Message = styled.p``;
