import styled from "styled-components";

import { ReactComponent as DefaultBackGround } from "../../assets/images/icons/ChattingDefaultBackground.svg";

//assets
export const DefaultBack = styled(DefaultBackGround)`
  margin: 22% 45%; //임시 사이즈
`;

export const ChattingContentContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
`;

export const TopFlex = styled.div`
  display: flex;
  flex-direction: row;
  height: 107px; //임시 사이징
  padding: 24px 0; // 임시 사이징
  border-bottom: 1px solid #d7d7d7;
  align-items: center;
  justify-content: space-between;
  padding: 0 34px 0 20px;
`;

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MiddleFlex = styled.div`
  flex-grow: 1;
  border: 2px solid red;
  overflow: scroll;
  padding: 23px 20px;
`;

export const BottomFlex = styled.form`
  display: flex;
  flex-direction: row;
  padding: 13px 32px;
  justify-content: space-between;
`;

export const TextInput = styled.input`
  width: 85%;
  border: 1px solid #d7d7d7;
  height: 45px;
  border-radius: 1000px;
  padding: 0 10px; //임시 사이징
`;

export const SendButton = styled.button`
  font-size: 16px;
  border: 1px solid #d7d7d7;
  width: 13%; //임시 사이징
  height: 45px;
  border-radius: 1000px;
`;
