import React, { useState } from "react";
import {
  ChattingFlexBox,
  ChattingListsContainer,
  Message,
} from "./ChattingLists.Style";
import ChattingList from "./ChattingListForm";
import { createNewChat } from "../../services/chatService";

interface ChattingListsProps {
  setDefaultBack: () => void;
}

const ChattingLists: React.FC<ChattingListsProps> = ({ setDefaultBack }) => {
  const [memberId, setMemberId] = useState<number>(0);

  return (
    <ChattingListsContainer>
      <ChattingFlexBox>
        <Message>Message</Message>
        <button onClick={() => createNewChat(memberId)}>+</button>
        <ChattingList setDefaultBack={setDefaultBack} />
      </ChattingFlexBox>
    </ChattingListsContainer>
  );
};

export default ChattingLists;
