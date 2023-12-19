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

interface ChattingListsProps {
  setDefaultBack: () => void;
  getRoomNumber: (id: number) => void;
}

const ChattingLists: React.FC<ChattingListsProps> = ({
  setDefaultBack,
  getRoomNumber,
}) => {
  const token = useRecoilValue(tokenAtom);
  const [rooms, setRooms] = useState<
    {
      id: number;
      member_id_1: number;
      member_id_2: number;
      last_message: string;
      created_at: string;
    }[]
  >([
    {
      id: 0,
      member_id_1: 1,
      member_id_2: 2,
      last_message: "마지막 채팅",
      created_at: "2023-11-29 16:03:01",
    },
  ]);
  const [memberId, setMemberId] = useState<number>(0);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [participants, setParticipants] = useState<{
    requestMemberId: number;
    inviteMemberId: number;
  }>({
    requestMemberId: 2,
    inviteMemberId: 3,
  });
  const roomsData = GetAllRoomsQuery();

  useEffect(() => {
    if (roomsData) {
      setRooms(roomsData);
    }
  }, [roomsData]);

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
          {rooms &&
            rooms.map((room, idx) => {
              return (
                <ChattingListContainer
                  key={idx}
                  onClick={() => {
                    sendRoomNumber(1);
                  }}
                >
                  <ProfileImage />
                  <MiddleWrap>
                    <UserName>유저이름</UserName>
                    <RecentConversation>{room.last_message}</RecentConversation>
                  </MiddleWrap>
                  <TimeStamp>* {room && setTime(room.created_at)}</TimeStamp>
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
