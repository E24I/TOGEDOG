import React from "react";
import {
  ContentForm,
  Date,
  Image,
  Talk,
  Talks,
  ContentContainer,
  UserName,
  Wrap,
} from "./DetailForm.Style";
import { messagesType } from "../../types/chatType";
import { useRecoilValue } from "recoil";
import { memberIdAtom } from "../../atoms";

interface DetailFormType {
  messages: messagesType;
}

const DetailForm: React.FC<DetailFormType> = ({ messages }) => {
  const myMemberId = useRecoilValue(memberIdAtom);
  return (
    <ContentForm>
      {messages &&
        messages.map((message, idx) => {
          return (
            <div key={message.messageId}>
              {message.createdAt[9] !== messages[idx - 1].createdAt[9] && (
                <Date>{message.createdAt}</Date>
              )}
              <ContentContainer>
                {message.memberId !== myMemberId && <Image></Image>}
                <Wrap>
                  {message.memberId !== myMemberId && (
                    <UserName>{message.memberId}</UserName>
                  )}
                  {/* 프로필과 닉네임은 나중에 유저조회로 불러오기 */}
                  <Talks>
                    <Talk>{message.content}</Talk>
                  </Talks>
                </Wrap>
              </ContentContainer>
            </div>
            //실시간 대화 업데이트용 폼이 필요한 경우 추가 생성
          );
        })}
    </ContentForm>
  );
};

export default DetailForm;
