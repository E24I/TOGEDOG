import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  CreateNewChatButton,
  Nickname,
  ProfileImg,
  SearchBar,
  SearchUsersContainer,
  SearchedUser,
} from "./SearchUsers.Style";
import { searchUser } from "../../services/chatService";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../atoms";
import { searchedUserType } from "../../types/chatType";
import { useCreateChattingRoom } from "../../hooks/ChatHooks";

const SearchUser: React.FC = () => {
  const token = useRecoilValue(tokenAtom);

  const [isSearched, setSearched] = useState<string>("");
  const [isUser, setUser] = useState<searchedUserType>();

  const [participants, setParticipants] = useState<{
    requestMemberId: number;
    inviteMemberId: number;
  }>({
    requestMemberId: 0,
    inviteMemberId: 3,
    //유저검색을 통해 추가
  });

  const { mutate: createChattingRoom } = useCreateChattingRoom(participants);

  //엔터키 누르면 실행
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    searchUser(isSearched, token)
      .then((res) => {
        setUser(res.data);
        setParticipants({
          requestMemberId: 0,
          inviteMemberId: res.data.memberId,
        });
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  //검색어 핸들러
  const searchValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSearched(e.target.value);
  };

  return (
    <SearchUsersContainer id="search" onSubmit={submitHandler}>
      <SearchBar form="search" onChange={searchValueHandler} />
      {isUser && (
        <SearchedUser>
          <ProfileImg src={isUser.imageUrl} />
          <Nickname>{isUser.nickname}</Nickname>
          <CreateNewChatButton onClick={() => createChattingRoom()}>
            채팅하기
          </CreateNewChatButton>
        </SearchedUser>
      )}
    </SearchUsersContainer>
  );
};

export default SearchUser;
