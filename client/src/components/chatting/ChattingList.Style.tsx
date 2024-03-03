import styled from "styled-components";
import { ReactComponent as SeeMore } from "../../assets/images/icons/SeeMore.svg";
import { ReactComponent as DefaultBackGround } from "../../assets/images/icons/ChattingDefaultBackground.svg";
import { ReactComponent as Fold } from "../../assets/images/icons/ArrowBtn.svg";

//assets
export const DefaultBack = styled(DefaultBackGround)`
  position: absolute;
  top: 40vh;
  width: 100%;
  path {
    fill: #ffffff;
  }
`;
export const SeeMoreButton = styled(SeeMore)`
  cursor: pointer;
  margin-left: 27px;
  z-index: 20;
`;
export const OpenButton = styled(Fold)`
  position: fixed;
  width: 40px;
  height: 40px;
  top: 10vh;
  left: 0px;
  z-index: 10;
  cursor: pointer;
  circle {
    fill: none;
  }
  path {
    fill: #ffffff;
  }

  &:hover {
    circle {
      fill: #ffffff;
    }
    path {
      fill: #494949;
    }
  }
`;
export const FoldButton = styled(Fold)`
  position: absolute;
  width: 40px;
  height: 40px;
  top: 0px;
  right: 0px;
  z-index: 10;
  transform: rotate(-0.5turn);
  cursor: pointer;
  circle {
    fill: none;
  }
  path {
    fill: #ffffff;
  }

  &:hover {
    circle {
      fill: #ffffff;
    }
    path {
      fill: #494949;
    }
  }
`;

//chatting whole container
export const ChattingFormContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ChattingListsContainer = styled.div<{ fold: string }>`
  position: relative;
  width: ${(props) => (props.fold === "true" ? "0%" : "35%")};
  height: 100vh;
  border-right: ${(props) =>
    props.fold === "true" ? "" : "1px solid #494949"};
  transition: all 0.3s;
`;

export const AccordionButton = styled.button<{ fold: string }>`
  position: absolute;
  top: 0px;
  right: ${(props) => (props.fold === "true" ? -50 : 0)}px;
  width: 50px;
  height: 100%;
  opacity: 25%;
  background: ${(props) =>
    props.fold === "true"
      ? `linear-gradient(to right, #69D3B0, rgba(0, 0, 0, 0))`
      : `linear-gradient(to left, #69D3B0, rgba(0, 0, 0, 0))`};
  z-index: 2;
`;

export const ChattingFlexBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: auto;
`;

export const Message = styled.div<{ fold: string }>`
  content-visibility: ${(props) => props.fold === "true" && "hidden"};
  position: sticky;
  top: 0px;
  left: 0;
  color: #ffffff;
  background-color: #494949;
  width: ${(props) => (props.fold === "true" ? "0%" : "100%")};
  height: 60px;
  text-align: center;
  padding-top: 22px;
  transition: all 0.3s;
  z-index: 3;
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
  justify-content: space-between;
  border-bottom: 1px solid #d7d7d7;
`;

export const MiddleWrap = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 60px; //임시 사이징
  justify-content: center;
  left: 60px;
`;

export const RecentConversation = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 13px;
`;

export const TimeStamp = styled.div`
  position: absolute;
  font-size: 13px;
  line-height: 60px;
  right: 40px;
`;

export const DefaultBackGroundWrapper = styled.div`
  position: relative;
  background-color: #494949;
  width: 100%;
`;
