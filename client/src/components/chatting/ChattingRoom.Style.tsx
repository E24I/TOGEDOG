import styled from "styled-components";
import { ReactComponent as CloseBtn } from "../../assets/images/icons/Xbutton.svg";

//assets
export const XButton = styled(CloseBtn)`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 15px;
  height: 15px;
  cursor: pointer;

  &:hover {
    path {
      stroke: #fadf84;
    }
  }
`;

//components
export const ChattingContentContainer = styled.div`
  position: relative;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
`;

export const TopFlex = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  height: 110px;
  border-bottom: 1px solid #d7d7d7;
  align-items: end;
  justify-content: space-between;
  padding: 0 20px 10px;
  background-color: #494949;
`;

export const ProfileWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const MiddleFlex = styled.div`
  display: flex;
  flex-direction: column-reverse;
  flex-grow: 1;
  overflow: auto;
  padding: 23px 20px;
  height: 70%;
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
