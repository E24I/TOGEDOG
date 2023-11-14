import React from "react";
import ChattingLists from "../components/chatting/ChattingLists";
import ChattingContent from "../components/chatting/ChattingContent";
import { ChattingContainer } from "../components/chatting/ChattingLists.Style";

const Chatting: React.FC = () => {
  return (
    <ChattingContainer>
      <ChattingLists />
      <ChattingContent />
    </ChattingContainer>
  );
};

export default Chatting;
