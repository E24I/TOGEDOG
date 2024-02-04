import styled from "styled-components";
import { ReactComponent as SeeMore } from "../../assets/images/icons/SeeMore.svg";
import { ReactComponent as DefaultBackGround } from "../../assets/images/icons/ChattingDefaultBackground.svg";
import { ReactComponent as Unfold } from "../../assets/images/icons/RightArrow.svg";
import { ReactComponent as Fold } from "../../assets/images/icons/LeftArrow.svg";

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
export const UnfoldButton = styled(Unfold)``;
export const FoldButton = styled(Fold)``;

//chatting whole container
export const ChattingFormContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ChattingListsContainer = styled.div<{ fold: string }>`
  width: ${(props) => (props.fold === "true" ? "0%" : "35%")};
  height: 100vh;
  border-right: ${(props) =>
    props.fold === "true" ? "" : "1px solid #d7d7d7"};
  transition: all 0.3s;
`;

export const AccordionButton = styled.button<{ fold: string }>`
  fill-opacity: 0;
  &:hover {
    fill-opacity: 100;
    background: linear-gradient(to right, #d7fff2, #ffffff);
    svg {
      transform: ${(props) =>
        props.fold === "true" ? "translateX(10px)" : "translateX(-10px)"};
      transition: transform 0.6s;
    }
    path {
      fill: #78aa99;
    }
  }
`;

export const ChattingFlexBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
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

export const RecentConversation = styled.div`
  width: 130px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
`;

export const TimeStamp = styled.div`
  min-width: 80px; //임시 사이징
  height: 60px;
  font-size: 13px;
  line-height: 60px;
`;

export const DefaultBackGroundWrapper = styled.div`
  position: relative;
  width: 100%;
`;
