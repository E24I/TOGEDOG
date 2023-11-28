import React from "react";
import {
  Checking,
  ContentForm,
  Date,
  Image,
  MyTalk,
  MyTalks,
  Talk,
  Talks,
  TheOtherPerson,
  UserName,
  Wrap,
} from "./DetailForm.Style";

interface DetailFormType {
  messages: {
    id: number;
    member_id: number;
    time: number;
    content: string[] | string;
  }[];
}

const DetailForm: React.FC<DetailFormType> = ({ messages }) => {
  return (
    <ContentForm>
      {messages &&
        messages.map((message) => {
          return (
            <>
              <Date>{message.time}</Date>
              <TheOtherPerson>
                <Image></Image>
                <Wrap>
                  <UserName>유저</UserName>
                  <Talks>
                    {message.member_id === 0 &&
                      Array.isArray(message.content) &&
                      message.content.map((content, idx) => {
                        return <Talk key={idx}>{content}</Talk>;
                      })}
                  </Talks>
                </Wrap>
              </TheOtherPerson>
              <MyTalks>
                {message.member_id === 0 &&
                  Array.isArray(message.content) &&
                  message.content.map((content, idx) => {
                    return <MyTalk key={idx}>{content}</MyTalk>;
                  })}
              </MyTalks>
              <Checking>읽음</Checking>
            </>
          );
        })}
    </ContentForm>
  );
};

export default DetailForm;
