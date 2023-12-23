import React, { MouseEvent, useEffect, useState } from "react";
import {
  ChattingFlexBox,
  ChattingList,
  ChattingListContainer,
  ChattingListsContainer,
  Message,
  MiddleWrap,
  ProfileImage,
  RecentConversation,
  SeeMoreButton,
  TimeStamp,
  UserName,
} from "./ChattingLists.Style";
import { createNewChat } from "../../services/chatService";
import DropDown from "../../atoms/dropdown/DropDown";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../atoms";
import { GetAllRoomsQuery } from "../../hooks/ChatHooks";
import { roomsDataType } from "../../types/chatType";

interface ChattingListsProps {
  setDefaultBack: () => void;
  getRoomNumber: (id: number) => void;
}

const ChattingLists: React.FC<ChattingListsProps> = ({
  setDefaultBack,
  getRoomNumber,
}) => {
  const token = useRecoilValue(tokenAtom);

  const [memberId, setMemberId] = useState<number>(0);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [participants, setParticipants] = useState<{
    requestMemberId: number;
    inviteMemberId: number;
  }>({
    requestMemberId: 2,
    inviteMemberId: 3,
  });
  const { data: roomsData } = GetAllRoomsQuery();

  const openDropDown = (e: MouseEvent) => {
    e.stopPropagation();
    if (isOpen !== false) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const sendRoomNumber = (roomId: number) => {
    setDefaultBack();
    getRoomNumber(roomId);
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

    return "";
  };

  return (
    <ChattingListsContainer>
      <ChattingFlexBox>
        <Message>Message</Message>
        <button onClick={() => createNewChat(participants, token)}>+</button>
        <ChattingList>
          {roomsData &&
            roomsData.map((room: roomsDataType) => {
              return (
                <ChattingListContainer
                  key={room.chatRoomId}
                  onClick={() => {
                    sendRoomNumber(room.chatRoomId);
                  }}
                >
                  <ProfileImage />
                  <MiddleWrap>
                    <UserName>{room.otherMember_id}</UserName>
                    <RecentConversation>
                      {room.latestMessage}
                    </RecentConversation>
                  </MiddleWrap>
                  <TimeStamp>* {room && setTime(room.createdAt)}</TimeStamp>
                  <button onBlur={() => setOpen(false)} onClick={openDropDown}>
                    <SeeMoreButton />
                  </button>
                  {isOpen && <DropDown component="list" setOpen={setOpen} />}
                </ChattingListContainer>
              );
            })}
        </ChattingList>
      </ChattingFlexBox>
    </ChattingListsContainer>
  );
};

export default ChattingLists;
