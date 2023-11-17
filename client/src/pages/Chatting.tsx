import React, { useState } from "react";
import ChattingLists from "../components/chatting/ChattingLists";
import ChattingContent from "../components/chatting/ChattingContent";
import { ChattingContainer } from "../components/chatting/ChattingLists.Style";

const Chatting: React.FC = () => {
  const [isEntered, setEnter] = useState<boolean>(false);

  const setDefaultBack = () => {
    if (isEntered === false) {
      setEnter(true);
    }
    console.log(isEntered);
  };
  return (
    <ChattingContainer>
      <ChattingLists setDefaultBack={setDefaultBack} />
      <ChattingContent isEntered={isEntered} />
    </ChattingContainer>
  );
};

export default Chatting;
