import React, { useState, useEffect, MouseEvent } from "react";
import { Stomp } from "@stomp/stompjs";
import {
  BottomFlex,
  ChattingContentContainer,
  DefaultBack,
  MiddleFlex,
  ProfileWrap,
  SendButton,
  TextInput,
  TopFlex,
} from "./ChattingContent.Style";
import {
  ProfileImage,
  SeeMoreButton,
  UserName,
} from "./ChattingListForm.Style";
import ContentListForm from "./ContentListForm";
import DropDown from "../../atoms/dropdown/DropDown";

interface ChattingContentprops {
  isEntered: boolean;
}

const ChattingContent: React.FC<ChattingContentprops> = ({ isEntered }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    {
      id: number;
      member_id: number;
      time: number;
      content: string[] | string;
    }[]
  >([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const socket = new WebSocket(`ws://15.165.78.7/chat/{roomId}`);
    const stompClient = Stomp.over(socket);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stompClient.connect({}, (frame: any) => {
      console.log("Connected: " + frame);
      stompClient.subscribe("/topic/chat", (message) => {
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    });

    return () => {
      stompClient.disconnect(() => {
        console.log("Disconnected");
      });
    };
  }, []);

  const sendMessage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newMessage = {
      id: 0,
      member_id: 0,
      time: Date.now(),
      content: inputMessage,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);

    // 서버로 메시지 전송
    // 이 부분은 실제 서버로 메시지를 보내는 부분으로, 서버와의 통신 방법에 따라 달라질 수 있습니다.
    // sendMessageToServer(inputMessage); // 서버로 메시지를 전송하는 함수 호출

    // 메시지 전송 후 input 초기화
    setInputMessage("");
  };
  const openDropDown = () => {
    if (isOpen !== false) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  return (
    <ChattingContentContainer>
      <TopFlex>
        <ProfileWrap>
          <ProfileImage />
          <UserName>후추김</UserName>
        </ProfileWrap>
        <button onBlur={() => setOpen(false)} onClick={openDropDown}>
          <SeeMoreButton />
        </button>
        {isOpen && <DropDown component="content" setOpen={setOpen} />}
      </TopFlex>
      <MiddleFlex>
        {!isEntered ? <DefaultBack /> : <ContentListForm messages={messages} />}
      </MiddleFlex>
      {isEntered && (
        <BottomFlex id="chatting">
          <TextInput
            form="chatting"
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <SendButton type="submit" onClick={(e) => sendMessage(e)}>
            보내기
          </SendButton>
        </BottomFlex>
      )}
    </ChattingContentContainer>
  );
};

export default ChattingContent;
