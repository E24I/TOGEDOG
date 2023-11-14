import React from "react";
import {
  ChattingListContainer,
  MiddleWrap,
  ProfileImage,
  RecentConversation,
  SeeMoreButton,
  TimeStamp,
  UserName,
} from "./ChattingListForm.Style";

//list mockData

const ChattingList: React.FC = () => {
  return (
    <ChattingListContainer>
      <ProfileImage />
      <MiddleWrap>
        <UserName>유저이름</UserName>
        <RecentConversation>
          어찌구저찌구어찌구저찌구어찌구저찌구어찌구저찌구어찌구저찌구어찌구저찌구어찌구저찌구
        </RecentConversation>
      </MiddleWrap>
      <TimeStamp>• 11시간 전</TimeStamp>
      <SeeMoreButton />
    </ChattingListContainer>
  );
};

export default ChattingList;
