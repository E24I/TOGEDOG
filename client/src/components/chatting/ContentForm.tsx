import React, { useEffect, useState } from "react";
import {
  ContentForm,
  Date,
  Talk,
  Talks,
  ContentContainer,
  Wrap,
  Time,
  BottomDiv,
  NoContents,
} from "./ContentForm.Style";
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

const ContentsForm: React.FC<DetailFormType> = ({
  data,
  myMemberId,
  setTarget,
}) => {
  const changeDate = (createAt: string, idx: number) => {
    if (idx === data.messages.length - 1) {
      return createAt.substring(0, createAt.indexOf("T"));
    } else if (createAt[9] !== data.messages[idx + 1].createAt[9]) {
      return createAt.substring(0, createAt.indexOf("T"));
    }
  };

  return (
    <ContentForm>
      {data.messages[0] && data.messages[0].content.length > 1 && (
        <div ref={setTarget} />
      )}
      {data.messages?.length > 0 ? (
        data.messages
          .map((message: messagesType, idx: number) => {
            return (
              <div key={message.messageId}>
                {changeDate(message.createAt, idx) && (
                  <Date>{changeDate(message.createAt, idx)}</Date>
                )}
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
          .reverse()
      ) : (
        <NoContents>대화 내용 없음</NoContents>
      )}
    </ContentForm>
  );
};

export default ContentsForm;
