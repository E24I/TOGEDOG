/* eslint-disable react-hooks/exhaustive-deps */
import React, { MouseEvent, useEffect, useState } from "react";
import {
  AccordionButton,
  ChattingFlexBox,
  ChattingFormContainer,
  ChattingList,
  ChattingListContainer,
  ChattingListsContainer,
  DefaultBack,
  DefaultBackGroundWrapper,
  FoldButton,
  Message,
  MiddleWrap,
  RecentConversation,
  SeeMoreButton,
  TimeStamp,
  UnfoldButton,
} from "./ChattingList.Style";
import DropDown from "../../atoms/dropdown/DropDown";
import { GetAllRoomsQuery } from "../../hooks/ChatHooks";
import { roomsDataType } from "../../types/chatType";
import SearchUser from "./SearchUsers";
import ChattingRoom from "./ChattingRoom";
import UserName from "./UserName";
import UserImage from "./UserImage";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  alreadyExistChatMemberAtom,
  chatRoomIdAtom,
  reportAtom,
  theOtherMemberIdAtom,
} from "../../atoms";

const ChattingLists: React.FC = () => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [listNumber, setlistNumber] = useState<number>(0);
  const [isFold, setFold] = useState<boolean>(false);
  const [reportModal, setReportModal] = useRecoilState(reportAtom);

  const setExistChatMember = useSetRecoilState(alreadyExistChatMemberAtom);
  const setTheOtherMemberId = useSetRecoilState(theOtherMemberIdAtom);
  const setRoomId = useSetRecoilState(chatRoomIdAtom);
  const roomId = useRecoilValue(chatRoomIdAtom);
  const otherMemberId = useRecoilValue(theOtherMemberIdAtom);

  const {
    data: roomsData,
    isLoading: roomsLoading,
    error: roomsError,
  } = GetAllRoomsQuery();

  useEffect(() => {
    setRoomId(undefined);
    if (roomsData) {
      setExistChatMember(
        Object.fromEntries(
          roomsData.map((room: roomsDataType) => {
            return [room.otherMemberId, room.chatRoomId];
          }),
        ),
      );
    }
  }, []);

  const openDropDown = (e: MouseEvent, id: number) => {
    e.stopPropagation();
    setlistNumber(id);
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
      <ChattingListsContainer fold={isFold}>
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
              roomsData.map((room: roomsDataType) => {
                return (
                  <ChattingListContainer
                    key={room.chatRoomId}
                    onClick={() => {
                      setRoomId(room.chatRoomId);
                      setTheOtherMemberId(room.otherMemberId);
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
                        openDropDown(e, room.chatRoomId);
                        setOpen(true);
                      }}
                    >
                      <SeeMoreButton />
                      {room.chatRoomId === listNumber && isOpen && (
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
      <AccordionButton onClick={() => setFold(!isFold)} fold={isFold}>
        {!isFold ? <FoldButton /> : <UnfoldButton />}
      </AccordionButton>

      {!roomId ? (
        <DefaultBackGroundWrapper>
          <DefaultBack />
        </DefaultBackGroundWrapper>
      ) : (
        <ChattingRoom roomId={roomId} otherMemberId={otherMemberId} />
      )}
    </ChattingFormContainer>
  );
};

export default ChattingLists;
