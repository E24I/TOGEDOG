import styled from "styled-components";
import { ReactComponent as SeeMore } from "../../assets/images/icons/SeeMore.svg";

//assets
export const SeeMoreButton = styled(SeeMore)`
  height: 100%; // 불필요한 수치일 수 있습니다
  cursor: pointer;
  border: 2px solid #576b88;
  margin-left: 27px;
  z-index: 20px;
`;

//chatting whole container
export const ChattingContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ChattingListsContainer = styled.div`
  width: 463px; //임시사이징 입니다
  height: 100vh;
  padding-bottom: 42px; //임시 사이징 입니다
  border-right: 1px solid #d7d7d7;
`;

export const ChattingFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 34px 0 49px; //임시사이즈
  border: 2px solid #a05555; //구분선 입니다
  height: 100%;
  overflow: scroll;
`;

export const Message = styled.p`
  margin-top: 30px; // 임시사이즈
`;

export const ChattingList = styled.div``;

export const ChattingListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 2px solid #3e802a9f; //구분선 입니다
  align-items: center;
  padding: 17px 0;
  cursor: pointer;
`;

export const ProfileImage = styled.img`
  width: 60px;
  height: 60px;
  border: 2px solid #ca2020; //구분선 입니다
  margin-right: 11px;
`;

export const MiddleWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 190px; // 임시 사이징
  height: 60px; //임시 사이징
  border: 2px solid #646f90; // 구분선 입니다
  justify-content: center;
`;

export const UserName = styled.div`
  font-size: 16px;
`;

export const RecentConversation = styled.p`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
`;

export const TimeStamp = styled.div`
  width: 66px; //임시 사이징
  height: 60px;
  font-size: 13px;
  border: 2px solid #da9b9b; //구분선 입니다
  line-height: 60px;
`;
