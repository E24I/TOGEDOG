import React, { MouseEvent, useState } from "react";
import {
  ChattingFlexBox,
  ChattingFormContainer,
  ChattingList,
  ChattingListContainer,
  ChattingListsContainer,
  DefaultBack,
  DefaultBackGroundWrapper,
  Message,
  MiddleWrap,
  RecentConversation,
  SeeMoreButton,
  TimeStamp,
} from "./ChattingForm.Style";
import DropDown from "../../atoms/dropdown/DropDown";
import { GetAllRoomsQuery } from "../../hooks/ChatHooks";
import { roomsDataType } from "../../types/chatType";
import SearchUser from "./SearchUsers";
import ChattingDetail from "./ChattingDetail";
import UserName from "./UserName";
import UserImage from "./UserImage";

const ChattingLists: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<number | undefined>(undefined);
  const [isEntered, setEnter] = useState<boolean>(false);
  const [listIndex, setListIndex] = useState<number>(0);

  const {
    data: roomsData,
    isLoading: roomsLoading,
    error: roomsError,
  } = GetAllRoomsQuery();

  const openDropDown = (e: MouseEvent, idx: number) => {
    e.stopPropagation();
    setListIndex(idx);
    if (isOpen !== false) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const setTime = (createdAt: string) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);

    const timeDiff = Math.floor(
      (currentDate.getTime() - createdDate.getTime()) / 1000,
    );

    const intervals = {
      년: 31536000,
      개월: 2592000,
      일: 86400,
      시간: 3600,
      분: 60,
      초: 1,
    };

    for (const [unit, seconds] of Object.entries(intervals)) {
      const diff = Math.floor(timeDiff / seconds);
      if (diff >= 1) {
        return `${diff} ${unit} 전`;
      }
    }

    return "1초전";
  };

  return (
    <ChattingFormContainer>
      <ChattingListsContainer>
        <ChattingFlexBox>
          <Message>Message</Message>
          <SearchUser />
          <ChattingList>
            {roomsLoading ? (
              <>loading...</>
            ) : roomsError ? (
              <>참여중인 대화방이 없습니다</>
            ) : (
              roomsData &&
              roomsData.map((room: roomsDataType, idx: number) => {
                return (
                  <ChattingListContainer
                    key={room.chatRoomId}
                    onClick={() => {
                      setRoomId(room.chatRoomId);
                      setEnter(true);
                    }}
                  >
                    <UserImage id={room.otherMemberId} component="list" />
                    <MiddleWrap>
                      <UserName id={room.otherMemberId} />
                      <RecentConversation>
                        {room.latestMessage === "not exist"
                          ? "대화 시작하기"
                          : room.latestMessage}
                      </RecentConversation>
                    </MiddleWrap>
                    <TimeStamp>* {room && setTime(room.createdAt)}</TimeStamp>
                    <button
                      onBlur={() => setOpen(false)}
                      onClick={(e) => {
                        openDropDown(e, idx);
                        setOpen(true);
                      }}
                    >
                      <SeeMoreButton />
                      {idx === listIndex && isOpen && (
                        <DropDown component="list" roomId={room.chatRoomId} />
                      )}
                    </button>
                  </ChattingListContainer>
                );
              })
            )}
          </ChattingList>
        </ChattingFlexBox>
      </ChattingListsContainer>
      {!isEntered ? (
        <DefaultBackGroundWrapper>
          <DefaultBack />
        </DefaultBackGroundWrapper>
      ) : (
        roomId && <ChattingDetail roomId={roomId} />
      )}
    </ChattingFormContainer>
  );
};

export default ChattingLists;
