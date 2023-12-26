import React, { useState } from "react";
import ChattingLists from "../components/chatting/ChattingLists";
import ChattingDetail from "../components/chatting/ChattingDetail";
import { ChattingContainer } from "../components/chatting/ChattingLists.Style";

const Chatting: React.FC = () => {
  const [isEntered, setEnter] = useState<boolean>(false);
  const [roomId, setRoomId] = useState<number>(0);

  const getRoomNumber = (id: number): void => {
    setRoomId(id);
  };

  const setDefaultBack = () => {
    if (isEntered === false) {
      setEnter(true);
    }
    console.log(isEntered);
  };
  return (
    <ChattingContainer>
      <ChattingLists
        setDefaultBack={setDefaultBack}
        getRoomNumber={getRoomNumber}
      />
      <ChattingDetail isEntered={isEntered} roomId={roomId} />
    </ChattingContainer>
  );
};

export default Chatting;
