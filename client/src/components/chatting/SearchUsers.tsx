import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  CreateNewChatButton,
  Nickname,
  ProfileImg,
  SearchBar,
  SearchUsersContainer,
  SearchedUser,
} from "./SearchUsers.Style";
import { searchedUserType } from "../../types/chatType";
import { GetUsersQuery, useCreateChattingRoom } from "../../hooks/ChatHooks";

const SearchUser: React.FC = () => {
  const [isSearched, setSearched] = useState<string>("");
  const [isSubmit, setSubmit] = useState<boolean>(false);

  const [participants] = useState<{
    requestMemberId: number;
    inviteMemberId: number;
  }>({
    requestMemberId: 0,
    inviteMemberId: 3,
    //유저검색을 통해 추가
  });

  const { mutate: createChattingRoom } = useCreateChattingRoom(participants);
  const {
    data: usersData,
    isLoading,
    error,
  } = GetUsersQuery(isSearched, 1, isSubmit);

  //엔터키 누르면 실행
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setSubmit(true);
  };
  //검색어 핸들러
  const searchValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmit(false);
    setSearched(e.target.value);
  };
  //검색된 채팅 상대 클릭
  const onClickHandler = (otherMemberId: number) => {
    participants.inviteMemberId = otherMemberId;
    createChattingRoom();
    setSubmit(false);
    setSearched("");
  };

  return (
    <SearchUsersContainer id="search" onSubmit={submitHandler}>
      <SearchBar
        form="search"
        value={isSearched}
        placeholder="유저 검색"
        onChange={searchValueHandler}
      />
      {isLoading ? (
        <>loading</>
      ) : error ? (
        <>error</>
      ) : (
        isSubmit &&
        usersData.data.data.map((user: searchedUserType, idx: number) => {
          return (
            <SearchedUser key={idx}>
              <ProfileImg src={user.imageUrl} />
              <Nickname>{user.nickname}</Nickname>
              <CreateNewChatButton
                onClick={() => {
                  onClickHandler(user.memberId);
                }}
              >
                채팅하기
              </CreateNewChatButton>
            </SearchedUser>
          );
        })
      )}
    </SearchUsersContainer>
  );
};

export default SearchUser;
