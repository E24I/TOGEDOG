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

//components
export const ChattingListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
  border: 2px solid #3e802a9f; //구분선 입니다
  align-items: center;
  padding: 17px 0;
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
  cursor: pointer;
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
