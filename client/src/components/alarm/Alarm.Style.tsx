import styled from "styled-components";

export const AlarmContainer = styled.div`
  position: absolute;
  top: 80px;
  left: 0;
  width: 100%;
  height: 100vh;
`;

export const AlarmBackground = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #2222225f;
`;

export const AlarmLists = styled.div`
  width: fit-content;
  height: 50%; //임시 사이징
  position: absolute;
  top: 20px;
  right: 20px;
  overflow: scroll;
`;

export const AlarmList = styled.p`
  width: 320px; //임시 사이즈
  padding: 31px 55px; //임시 사이즈
  font-size: 15px; //임시 사이즈
  background-color: #d7d7d7;
  text-align: center;
  border: 2px solid blue; //구분선
  margin-top: 17px;
`;
