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
} from "./ContentListForm.Style";

const ContentListForm: React.FC = () => {
  return (
    <ContentForm>
      <Date>23.11.13(월)</Date>
      <TheOtherPerson>
        <Image></Image>
        <Wrap>
          <UserName>hoi</UserName>
          <Talks>
            <Talk>
              대화 1 <br /> 대화1 문단 나눔
            </Talk>
            <Talk>대화2</Talk>
          </Talks>
        </Wrap>
      </TheOtherPerson>
      <MyTalks>
        <MyTalk>
          내가 보낸 메시지하하호호
          <br />
          이디야이디야
        </MyTalk>
        <MyTalk>내가 보낸 메시지</MyTalk>
      </MyTalks>
      <Checking>읽음</Checking>
    </ContentForm>
  );
};

export default ContentListForm;
