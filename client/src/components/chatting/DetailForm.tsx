import React from "react";
import {
  ContentForm,
  Date,
  Talk,
  Talks,
  ContentContainer,
  Wrap,
  Time,
  BottomDiv,
} from "./DetailForm.Style";
import { messagesType } from "../../types/chatType";
import UserName from "./UserName";
import UserImage from "./UserImage";

interface DetailFormType {
  data: any;
  myMemberId: number;
  setTarget: React.Dispatch<
    React.SetStateAction<HTMLDivElement | null | undefined>
  >;
}

const DetailForm: React.FC<DetailFormType> = ({
  data,
  myMemberId,
  setTarget,
}) => {
  const changeDate = (createAt: string) => {
    for (let i = 0; i < data.messages.length; i++) {
      if (
        createAt[10] === data.messages[i][10] &&
        createAt[10] !== data.messages[i - 1][10]
      ) {
        return createAt.substring(0, createAt.indexOf("T"));
      }
    }
  };

  return (
    <ContentForm>
      <div ref={setTarget} />
      {data.messages &&
        data.messages
          .map((message: messagesType, idx: number) => {
            return (
              <div key={message.messageId}>
                <Date>
                  {idx === 0
                    ? message.createAt.substring(
                        0,
                        message.createAt.indexOf("T"),
                      )
                    : changeDate(message.createAt)}
                </Date>
                <ContentContainer>
                  {message.memberId !== myMemberId && (
                    <>
                      <UserImage id={message.memberId} />
                      <Wrap>
                        <UserName id={message.memberId} />
                        <Talks data="mate">
                          <Talk>{message.content}</Talk>
                          <BottomDiv>
                            <Time>{message.createAt.substring(11, 16)}</Time>
                          </BottomDiv>
                        </Talks>
                      </Wrap>
                    </>
                  )}
                  {message.memberId === myMemberId && (
                    <Talks data="my">
                      <Talk>{message.content}</Talk>
                      <BottomDiv time="my">
                        <Time>{message.createAt.substring(11, 16)}</Time>
                      </BottomDiv>
                    </Talks>
                  )}
                </ContentContainer>
              </div>
            );
          })
          .reverse()}
    </ContentForm>
  );
};

export default DetailForm;
