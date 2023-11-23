import styled from "styled-components";

import { ReactComponent as Backspace } from "../../../assets/images/icons/Backspace.svg";
import { ReactComponent as Cancel } from "../../../assets/images/icons/CancelButton.svg";

// assets
export const BackspaceButton = styled(Backspace)`
  cursor: pointer;
`;
export const CancelBtn = styled(Cancel)`
  cursor: pointer;
  margin-right: 10px;
`;

// 피드 전체 컨테이너
export const CreateFeedContainer = styled.div`
  border: 2px solid #ffa1a1; // 구분선 입니다
  margin: 60px;
`;

//피드 탑 컨테이너
export const FeedTopContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 2px solid #63af80; //구분선 입니다
`;

export const PageName = styled.p`
  font-weight: 800;
`;

export const CreateButton = styled.button`
  font-weight: 800;
  width: 100px;
`;

//하단 컨테이너(지도 검색, 토글)
export const FeedBottomContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-top: 1px solid #d7d7d7;
  padding-top: 31px; //임시사이징
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

export const SearchResult = styled.div`
  text-align: center;
`;

//토글들
export const Toggles = styled.div``;

//토클 래핑
export const ToggleWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  padding: 5px;
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

//지도
export const Map = styled.div``;
