import styled from "styled-components";

import { ReactComponent as Backspace } from "../../../assets/images/icons/Backspace.svg";
import { ReactComponent as Cancel } from "../../../assets/images/icons/CancelButton.svg";

// assets
export const BackspaceButton = styled(Backspace)`
  width: 34px;
  height: 34px;
  path {
    fill: #494949;
  }
  &:hover {
    path {
      fill: #f8d259;
    }
  }
  @media screen and (max-width: 767px) {
    width: 24px;
    height: 24px;
  }
  cursor: pointer;
`;
export const CancelBtn = styled(Cancel)`
  cursor: pointer;
  margin-right: 10px;
`;

// 피드 전체 컨테이너
export const CreateFeedContainer = styled.div`
  margin: 60px;
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    margin: 34px;
  }
  @media screen and (max-width: 767px) {
    margin: 8px;
  }
  transition: all 0.2s;
`;

//피드 탑 컨테이너
export const FeedTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const PageName = styled.p`
  font-size: 24px;
  font-weight: 500;
  @media screen and (max-width: 767px) {
    font-size: 17px;
    font-weight: 600;
  }
`;

export const CreateButton = styled.button`
  font-size: 20px;
  color: #494949;
  font-weight: 500;
  width: fit-content;
  @media screen and (max-width: 767px) {
    font-size: 14px;
    font-weight: 600;
  }
  &:hover {
    color: #f8d259;
  }
`;

//하단 컨테이너(지도 검색, 토글)
export const FeedBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid #d7d7d7;
  padding-top: 5px;
`;

//검색한 주소 컨테이너
export const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  height: 100%;
  margin-left: 5px; // 임시 입니다
`;

export const SearchLoaction = styled.input`
  border: 2px solid black; //구분선
  width: 70px;
`;

export const MarkResult = styled.div`
  text-align: center;
`;

//토글들
export const Toggles = styled.div`
  width: 100%;
`;

export const ToggleFlex = styled.div`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #d7d7d7;
`;

//토클 래핑
export const ToggleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 10px;
`;

//토글배경
export const ToggleContainer = styled.div<{ data: string }>`
  position: relative;
  width: 45px;
  height: 25px;
  margin-left: 10px;
  border-radius: 50px;
  background-color: ${(props) =>
    props.data === "false" ? "#d7d7d7" : "#79D87C"};
`;

//토글배경
export const ToggleCircle = styled.div<{ data: string }>`
  position: absolute;
  width: 23px;
  height: 23px;
  top: 1px;
  left: ${(props) => (props.data === "false" ? "1px" : "21px")};
  border-radius: 50px;
  background-color: #ffffff;
  transition: ${(props) => (props.data === "false" ? "none" : "0.3s")};
`;
