/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, FormEvent } from "react";
import { Client } from "@stomp/stompjs";
import {
  BottomFlex,
  ChattingContentContainer,
  MiddleFlex,
  ProfileWrap,
  SendButton,
  TextInput,
  TopFlex,
} from "./ChattingDetail.Style";

import DetailForm from "./DetailForm";
import DropDown from "../../atoms/dropdown/DropDown";
import { SeeMoreButton } from "./ChattingForm.Style";
import { useRecoilValue } from "recoil";
import { memberIdAtom } from "../../atoms";
import UserName from "./otherUserName";
import UserImage from "./otherUserImage";
import { queryClient } from "../..";

interface ChattingDetailprops {
  isLoading: boolean;
  error: Error | null;
  data: any;
  roomId: number | undefined;
}

const ChattingDetail: React.FC<ChattingDetailprops> = ({
  roomId,
  data,
  isLoading,
  error,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  //이전대화기록과, 실시간 추가 기록을 모두 합친 데이터를 detailform으로 전달해야 함
  //타입 정의를 위해서 실시간 응답 데이터의 형태를 알아야함 - 이전 기록과 같으면 좋음
  const [inputMessage, setInputMessage] = useState<string>("");
  const [client, setClient] = useState<any>(null);

  const myMemberId = useRecoilValue(memberIdAtom);
  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://15.165.78.7:8080/ws", // WebSocket 서버 주소 및 엔드포인트
      debug: (str) => {
        console.log(str, "디버그");
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
      const subscription = client.subscribe(`/sub/chat/${roomId}`, () => {
        queryClient.invalidateQueries({ queryKey: ["messages"] });
      });
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

  const sendMessage = (e: FormEvent) => {
    e.preventDefault();
    const content = inputMessage;
    const memberId = myMemberId;
    if (client && client.connected) {
      client.publish({
        destination: `/pub/chat/${roomId}`,
        body: JSON.stringify({ content, memberId }),
      });
    } else {
      // client가 null인 경우에 대한 처리
      console.error("client is null");
    }
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
          <UserImage id={myMemberId} />
          <UserName id={myMemberId} />
        </ProfileWrap>
        <button onBlur={() => setOpen(false)} onClick={openDropDown}>
          <SeeMoreButton />
        </button>
        {isOpen && <DropDown component="content" />}
      </TopFlex>
      {isLoading ? (
        <>loading message...</>
      ) : error ? (
        <>error</>
      ) : (
        <>
          <MiddleFlex>
            <DetailForm
              messages={data.messages}
              myMemberId={myMemberId ? myMemberId : 0}
            />
          </MiddleFlex>
          <BottomFlex id="chatting" onSubmit={(e) => sendMessage(e)}>
            <TextInput
              form="chatting"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <SendButton type="submit">보내기</SendButton>
          </BottomFlex>
        </>
      )}
    </ChattingContentContainer>
  );
};

export default ChattingDetail;
