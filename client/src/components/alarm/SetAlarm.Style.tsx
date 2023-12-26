import styled from "styled-components";

//components
export const SetAlarmContainer = styled.div``;
export const SetAlarmBackground = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: #2222225f;
`;
export const SettingBox = styled.div`
  position: fixed;
  left: 25%;
  top: 20%;
  width: 50%;
  height: 70%;
  background-color: white;
  border-radius: 20px; //임시 사이즈
  padding: 3.2px 10px; //임시 사이즈
`;
export const TopContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 24px; //임시 사이즈
`;
export const SaveBtn = styled.button`
  margin-right: 20px; //임시 사이즈
  font-size: 24px; //임시 사이즈
`;

export const MiddleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 10px; //임시 사이즈
`;
export const List = styled.div``;
export const Title = styled.p`
  font-size: 20px; //임시 사이즈
  font-weight: 800; //임시 사이즈
`;
export const Description = styled.p`
  font-size: 15px; //임시 사이즈
`;
