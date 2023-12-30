import React from "react";
import {
  ContentForm,
  Date,
  Talk,
  Talks,
  ContentContainer,
  Wrap,
} from "./DetailForm.Style";
import { messagesType } from "../../types/chatType";
import UserName from "./otherUserName";
import UserImage from "./otherUserImage";

interface DetailFormType {
  messages: messagesType;
  myMemberId: number;
}

const DetailForm: React.FC<DetailFormType> = ({ messages, myMemberId }) => {
  return (
    <ContentForm>
      {messages &&
        messages
          .map((message) => {
            return (
              <div key={message.messageId}>
                <Date>{message.createdAt}</Date>
                <ContentContainer>
                  {message.memberId !== myMemberId && (
                    <>
                      <UserImage id={message.memberId} />
                      <Wrap>
                        <UserName id={message.memberId} />
                        <Talks data="mate">
                          <Talk>{message.content}</Talk>
                        </Talks>
                      </Wrap>
                    </>
                  )}
                  {message.memberId === myMemberId && (
                    <Talks data="my">
                      <Talk>{message.content}</Talk>
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
