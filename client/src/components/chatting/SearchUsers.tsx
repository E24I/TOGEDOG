import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  CreateNewChatButton,
  NoResult,
  SearchBar,
  SearchUsersContainer,
  SearchedUser,
  XButton,
} from "./SearchUsers.Style";
import { searchedUserType } from "../../types/chatType";
import { GetUsersQuery, useCreateChattingRoom } from "../../hooks/ChatHooks";
import UserName from "./UserName";
import UserImage from "./UserImage";
import { useRecoilValue } from "recoil";
import { alreadyExistChatMemberAtom, tokenAtom } from "../../atoms";
import { useNavigate } from "react-router-dom";

const SearchUser: React.FC = () => {
  const [isSearched, setSearched] = useState<string>("");
  const [isSubmit, setSubmit] = useState<boolean>(false);
  const [inviteId, setInviteId] = useState<number | undefined>(undefined);

  const alreadyExistChatMember = useRecoilValue(alreadyExistChatMemberAtom);
  const token = useRecoilValue(tokenAtom);

  const navigator = useNavigate();

  const { mutate: createChattingRoom } = useCreateChattingRoom(inviteId);
  const {
    data: usersData,
    isLoading,
    error,
  } = GetUsersQuery(isSearched, 1, isSubmit);

  //엔터키 누르면 실행
  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    if (token) {
      setSubmit(true);
    } else {
      alert("로그인이 해제 되었습니다. 로그인 페이지로 이동합니다");
      navigator("/login");
    }
  };
  //검색어 핸들러
  const searchValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setSubmit(false);
    setSearched(e.target.value);
  };
  //검색된 채팅 상대 클릭
  const onClickHandler = () => {
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
        onChange={(e) => searchValueHandler(e)}
      ></SearchBar>
      {isSearched.length !== 0 && (
        <XButton
          onClick={() => {
            setSubmit(false);
            setSearched("");
          }}
        />
      )}
      {isLoading ? (
        <>loading</>
      ) : error ? (
        <>error</>
      ) : (
        isSubmit &&
        alreadyExistChatMember &&
        (usersData.data.data.length === 0 ? (
          <NoResult>검색 결과 없음</NoResult>
        ) : (
          usersData.data.data.map((user: searchedUserType, idx: number) => {
            return (
              alreadyExistChatMember === undefined ||
              (!Object.keys(alreadyExistChatMember).includes(
                user.memberId.toString(),
              ) && (
                <SearchedUser key={idx}>
                  <UserImage id={user.memberId} />
                  <UserName id={user.memberId} />
                  <CreateNewChatButton
                    onClick={() => {
                      setInviteId(user.memberId);
                      onClickHandler();
                    }}
                  >
                    채팅하기
                  </CreateNewChatButton>
                </SearchedUser>
              ))
            );
          })
        ))
      )}
    </SearchUsersContainer>
  );
};

export default SearchUser;
