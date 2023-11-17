import React from "react";
import {
  ChattingFlexBox,
  ChattingListsContainer,
  Message,
} from "./ChattingLists.Style";
import ChattingList from "./ChattingListForm";

interface ChattingListsProps {
  setDefaultBack: () => void;
}

const ChattingLists: React.FC<ChattingListsProps> = ({ setDefaultBack }) => {
  return (
    <ChattingListsContainer>
      <ChattingFlexBox>
        <Message>Message</Message>
        <ChattingList setDefaultBack={setDefaultBack} />
      </ChattingFlexBox>
    </ChattingListsContainer>
  );
};

export default ChattingLists;
