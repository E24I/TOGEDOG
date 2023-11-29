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
  const [client, setClient] = useState<any>(null);

  // GetAllMessagesQuery(roomId).then((data) => setMessages(data));

  useEffect(() => {
    // WebSocket 연결 생성
    const client = new Client({
      brokerURL: "ws://290c-61-101-53-142.ngrok-free.app/ws", // WebSocket 서버 주소 및 엔드포인트
      debug: (str) => {
        console.log(str);
      },
    });
    setClient(client);

    // 연결 시도
    if (roomId) {
      client.activate();
    }

    // 연결이 성공했을 때 실행될 콜백
    client.onConnect = () => {
      // 구독할 특정 주제(topic)에 대한 구독
      const subscription = client.subscribe(
        `/sub/chat/${roomId}`,
        (message: { body: any }) => {
          // 메시지가 도착했을 때 실행할 동작
          console.log("Received message:", message.body);
          // 여기서 메시지 처리 또는 화면 업데이트 등을 수행할 수 있습니다.
        },
      );
      return subscription;
    };

    client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
      // 연결이 실패했을 때
    };

    client.onWebSocketError = (event) => {
      console.error("WebSocket connection error", event);
      // 웹소켓 연결에 문제가 발생했을 때
    };

    client.onDisconnect = () => {
      console.log("Disconnected");
      // 연결이 끊겼을 때
    };
  }, [roomId]);

  const sendMessage = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (client && client.connected) {
      client.publish({
        destination: `/pub/chat/${roomId}`, // 채팅 메시지를 받을 서버의 엔드포인트
        body: inputMessage, // 전송할 메시지 본문
      });
      setInputMessage("");
    } else {
      // client가 null인 경우에 대한 처리
      console.error("client is null");
    }
  };

  const openDropDown = () => {
    if (isOpen !== false) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };
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
