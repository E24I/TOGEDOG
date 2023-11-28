import React, { useState } from "react";
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
import { GetAllRoomsQuery } from "../../services/chatService";
import DropDown from "../../atoms/dropdown/DropDown";

interface ChattingListsProps {
  setDefaultBack: () => void;
  getRoomNumber: (id: number) => void;
}

const ChattingLists: React.FC<ChattingListsProps> = ({
  setDefaultBack,
  getRoomNumber,
}) => {
  const [rooms, setRooms] = useState<{ id: number }[]>([{ id: 0 }]);
  const [memberId, setMemberId] = useState<number>(0);
  const [isOpen, setOpen] = useState<boolean>(false);
  // GetAllRoomsQuery().then((data) => {
  //   setRooms(data.chat_rooms);
  // });
  const openDropDown = () => {
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

  return (
    <ChattingListsContainer>
      <ChattingFlexBox>
        <Message>Message</Message>
        <button onClick={() => createNewChat(memberId)}>+</button>
        <ChattingList>
          {rooms &&
            rooms.map((room, idx) => {
              return (
                <ChattingListContainer key={idx}>
                  <ProfileImage />
                  <MiddleWrap
                    onClick={() => {
                      sendRoomNumber(room.id);
                    }}
                  >
                    <UserName>유저이름</UserName>
                    <RecentConversation>
                      어찌구저찌구어찌구저찌구어찌구저찌구어찌구저찌구어찌구저찌구어찌구저찌구어찌구저찌구
                    </RecentConversation>
                  </MiddleWrap>
                  <TimeStamp>• 11시간 전</TimeStamp>
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
