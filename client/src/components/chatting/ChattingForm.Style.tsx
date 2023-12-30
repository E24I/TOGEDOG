import styled from "styled-components";
import { ReactComponent as SeeMore } from "../../assets/images/icons/SeeMore.svg";
import { ReactComponent as DefaultBackGround } from "../../assets/images/icons/ChattingDefaultBackground.svg";

//assets
export const DefaultBack = styled(DefaultBackGround)`
  position: absolute;
  top: 40vh;
  width: 100%;
`;
export const SeeMoreButton = styled(SeeMore)`
  height: 100%; // 불필요한 수치일 수 있습니다
  cursor: pointer;
  margin-left: 27px;
  z-index: 20px;
`;

//chatting whole container
export const ChattingFormContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ChattingListsContainer = styled.div`
  min-width: 310px;
  width: 35%;
  height: 100vh;
  border-right: 1px solid #d7d7d7;
`;

export const ChattingFlexBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: scroll;
`;

export const Message = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  z-index: 5;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #d7d7d7;
  text-align: center;
  padding-top: 22px;
`;

export const ChattingList = styled.div`
  position: absolute;
  top: 120px;
  left: 0;
  width: 100%;
`;

export const ChattingListContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 17px 10px;
  cursor: pointer;
`;

export const MiddleWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 190px; // 임시 사이징
  height: 60px; //임시 사이징
  justify-content: center;
  margin-left: 11px;
`;

export const RecentConversation = styled.p`
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
`;

export const TimeStamp = styled.div`
  width: 80px; //임시 사이징
  height: 60px;
  font-size: 13px;
  line-height: 60px;
`;

export const DefaultBackGroundWrapper = styled.div`
  position: relative;
  width: 100%;
`;
