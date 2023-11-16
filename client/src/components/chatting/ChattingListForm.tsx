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
import Toast from "./Toast";
//list mockData

interface ChattingListProps {
  setDefaultBack: () => void;
}

const ChattingList: React.FC<ChattingListProps> = ({ setDefaultBack }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const openToast = () => {
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
      <SeeMoreButton onClick={openToast} />
      {isOpen && <Toast page="list" />}
    </ChattingListContainer>
  );
};

export default ChattingList;
