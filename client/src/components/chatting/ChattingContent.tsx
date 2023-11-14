import React from "react";
import {
  BottomFlex,
  ChattingContentContainer,
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

const ChattingContent: React.FC = () => {
  return (
    <ChattingContentContainer>
      <TopFlex>
        <ProfileWrap>
          <ProfileImage />
          <UserName>후추김</UserName>
        </ProfileWrap>
        <SeeMoreButton />
      </TopFlex>
      <MiddleFlex>
        <ContentListForm />
        <ContentListForm />
        <ContentListForm />
        <ContentListForm />
        <ContentListForm />
        <ContentListForm />
        <ContentListForm />
        <ContentListForm />
      </MiddleFlex>
      <BottomFlex id="chatting">
        <TextInput form="chatting" />
        <SendButton type="submit">보내기</SendButton>
      </BottomFlex>
    </ChattingContentContainer>
  );
};

export default ChattingContent;
