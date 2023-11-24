import React, { useState } from "react";
import {
  ChattingListContainer,
  MiddleWrap,
  ProfileImage,
  RecentConversation,
  SeeMoreButton,
  TimeStamp,
  UserName,
} from "./ChattingListForm.Style";
import DropDown from "../../atoms/dropdown/DropDown";
//list mockData

interface ChattingListProps {
  setDefaultBack: () => void;
}

const ChattingList: React.FC<ChattingListProps> = ({ setDefaultBack }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const openDropDown = () => {
    if (isOpen !== false) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  return (
    <ChattingListContainer>
      <ProfileImage />
      <MiddleWrap onClick={() => setDefaultBack()}>
        <UserName>유저이름</UserName>
        <RecentConversation>
          어찌구저찌구어찌구저찌구어찌구저찌구어찌구저찌구어찌구저찌구어찌구저찌구어찌구저찌구
        </RecentConversation>
      </MiddleWrap>
      <TimeStamp>• 11시간 전</TimeStamp>
      <button onBlur={() => setOpen(false)} onClick={openDropDown}>
        <SeeMoreButton />
      </button>
      {isOpen && <DropDown component="list" setOpen={setOpen} />}
    </ChattingListContainer>
  );
};

export default ChattingList;
