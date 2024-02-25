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
      stroke: #494949;
    }
  }
`;

export const SearchUsersContainer = styled.form`
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 1;
`;
export const SearchBar = styled.input`
  width: 100%;
  height: 100%;
  padding-left: 5%;
  &::placeholder {
    font-size: 14px;
  }
  background-color: #f4f4f4;
`;

export const NoResult = styled.div`
  text-align: center;
  line-height: 100px;
  background-color: #fadf84;
  color: #494949;
`;

export const SearchedUser = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
  background-color: #fadf84;
  border-bottom: 1px solid #ffffff;
`;

export const CreateNewChatButton = styled.button`
  background-color: #494949;
  color: #ffffff;
  padding: 10px;
  border-radius: 15px;

  &:hover {
    background-color: transparent;
    color: #494949;
    font-weight: 600;
  }
`;
