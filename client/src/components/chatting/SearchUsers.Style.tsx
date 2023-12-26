import styled from "styled-components";

export const SearchUsersContainer = styled.form`
  border: 1px solid #b0b0b0;
  z-index: 5;
  position: absolute;
  top: 60px;
  left: 0;
  width: 100%;
`;
export const SearchBar = styled.input``;

export const SearchedUser = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  align-items: center;
  justify-content: space-between;
`;
export const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 100px;
  background-color: antiquewhite;
`;

export const Nickname = styled.div``;

export const CreateNewChatButton = styled.button`
  background-color: #c0c0e9;
  padding: 10px;
  border-radius: 15px;
`;
