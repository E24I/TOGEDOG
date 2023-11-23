import React, { useState } from "react";
import {
  BottomFlex,
  ChattingContentContainer,
  DefaultBack,
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
import DropDown from "../common/DropDown";

interface ChattingContentprops {
  isEntered: boolean;
}

const ChattingContent: React.FC<ChattingContentprops> = ({ isEntered }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
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
          <ProfileImage />
          <UserName>후추김</UserName>
        </ProfileWrap>
        <button onBlur={() => setOpen(false)} onClick={openDropDown}>
          <SeeMoreButton />
        </button>
        {isOpen && <DropDown component="content" setOpen={setOpen} />}
      </TopFlex>
      <MiddleFlex>
        {!isEntered ? <DefaultBack /> : <ContentListForm />}
      </MiddleFlex>
      {isEntered && (
        <BottomFlex id="chatting">
          <TextInput form="chatting" />
          <SendButton type="submit">보내기</SendButton>
        </BottomFlex>
      )}
    </ChattingContentContainer>
  );
};

export default ChattingContent;
