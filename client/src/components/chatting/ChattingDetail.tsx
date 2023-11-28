import React, { useState, useEffect, MouseEvent } from "react";
import { Client } from "@stomp/stompjs";
import {
  BottomFlex,
  ChattingContentContainer,
  DefaultBack,
  MiddleFlex,
  ProfileWrap,
  SendButton,
  TextInput,
  TopFlex,
} from "./ChattingDetail.Style";

import DetailForm from "./DetailForm";
import DropDown from "../../atoms/dropdown/DropDown";
import { ProfileImage, SeeMoreButton, UserName } from "./ChattingLists.Style";
import { GetAllMessagesQuery } from "../../services/chatService";

interface ChattingDetailprops {
  isEntered: boolean;
  roomId: number;
}

const ChattingDetail: React.FC<ChattingDetailprops> = ({
  isEntered,
  roomId,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [messages, setMessages] = useState<
    {
      id: number;
      member_id: number;
      time: number;
      content: string[] | string;
    }[]
  >([]);
  const [liveMessages, setLiveMessages] = useState<
    {
      id: number;
      member_id: number;
      time: number;
      content: string[] | string;
    }[]
  >([]);
  const [inputMessage, setInputMessage] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [client, setClient] = useState<Client | null>(null);

  // GetAllMessagesQuery(roomId).then((data) => setMessages(data));

  useEffect(() => {
    if (roomId && client) {
      const stompClient = new Client({
        brokerURL: `ws://15.165.78.7/chat/${roomId}`,
        connectHeaders: {
          login: `{memberId}`,
          passcode: `{password}`,
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000,
      });

      client.activate();
      setClient(stompClient);

      const subscription = client.subscribe(
        `/chat/${roomId}`,
        (message: { body: any }) => {
          console.log(`Received message: ${message.body}`);
        },
      );

      return () => {
        subscription.unsubscribe();
        client.deactivate();
      };
    }
  }, []);

  const sendMessage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (client) {
      // client가 null이 아닌 경우에만 해당 블록을 실행합니다.
      // 예를 들어, client.publish()와 같은 작업을 수행할 수 있습니다.
      client.publish({
        destination: `/chat/${roomId}`,
        body: inputMessage,
      });
      setInputMessage("");
    } else {
      // client가 null인 경우에 대한 처리
      console.error("client is null");
    }

    const newMessage = {
      id: 0,
      member_id: 0,
      time: Date.now(),
      content: inputMessage,
    };

    setLiveMessages(() => [...liveMessages, newMessage]);
    setMessages((prevMessages) => [...prevMessages, ...liveMessages]);
  };
  const openDropDown = () => {
    if (isOpen !== false) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
  console.log(liveMessages);
  console.log(messages);
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
        {!isEntered ? <DefaultBack /> : <DetailForm messages={messages} />}
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

export default ChattingDetail;
