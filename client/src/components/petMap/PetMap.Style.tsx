import styled from "styled-components";
import { ReactComponent as SearchIcon } from "../../assets/images/icons/Search.svg";
import { ReactComponent as RightArrowCircle } from "../../assets/images/icons/RightArrow_Circle.svg";
import { ReactComponent as LeftArrowCircle } from "../../assets/images/icons/LeftArrow_Circle.svg";
import { ReactComponent as RightArrow } from "../../assets/images/icons/RightArrow.svg";
import { ReactComponent as LeftArrow } from "../../assets/images/icons/LeftArrow.svg";
import { ReactComponent as SetModeIcon } from "../../assets/images/icons/Setting.svg";

export const PetMapContainer = styled.div`
  position: relative;
  width: 100vw;
  height: calc(100vh - 80px);
`;

export const MapContainer = styled.div`
  width: 100%;
  max-height: 100%;
`;
export const LevelBtn = styled.button`
  background-color: rgb(73, 73, 73);
  box-shadow: 1px 1px 2px 0.01px rgb(131, 131, 131);
  width: 33px;
  height: 33px;
  color: rgb(248, 210, 89);
  font-size: 24px;
  text-align: center;
  font-weight: bold;
  z-index: 20;
`;
export const PlusLevel = styled(LevelBtn)`
  border-radius: 8px 8px 0 0;
  position: absolute;
  bottom: 57px;
  right: 14px;
`;
export const MinusLevel = styled(LevelBtn)`
  border-radius: 0 0 8px 8px;
  position: absolute;
  bottom: 14px;
  right: 14px;
`;

export const SearchBtn = styled.button`
  background-color: rgb(105, 211, 176);
  box-shadow: 2px 2px 5px 0.1px rgb(150, 150, 150);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  position: absolute;
  top: 17px;
  left: 17px;
  z-index: 10;
  &:hover {
    background-color: rgb(95, 199, 164);
  }
  &:active {
    background-color: rgb(95, 199, 164);
    box-shadow: 1px 1px 2px 0.1px rgb(150, 150, 150) inset;
  }
`;

export const Search = styled(SearchIcon)`
  width: 22px;
  height: 22px;
`;

export const SideContainer = styled.div<{ mapMode: boolean }>`
  background-color: ${(props) =>
    props.mapMode ? "rgba(105, 211, 176, 0.7)" : "rgba(250, 223, 132, 0.7)"};
  width: 100%;
  max-width: 430px;
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  transition: 500ms;
`;

export const SearchContainer = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const SearchSection = styled.section`
  width: 100%;
  padding: 17px 23px;
  position: relative;
`;

export const SearchBox = styled.div`
  background-color: white;
  border: 1px solid rgb(215, 215, 215);
  box-shadow: 1px 1px 2px 0.01px rgb(131, 131, 131);
  border-radius: 24px;
  width: 100%;
  height: 39px;
  padding: 0px 13px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const SearchInput = styled.input`
  width: 100%;
  font-size: 13px;
`;

export const SearchInputBtn = styled(SearchIcon)`
  width: 15px;
  height: 15px;
  cursor: pointer;
  &:hover {
    path {
      fill: rgb(114, 114, 114);
    }
  }
`;

export const SearchCloseBtn = styled.button`
  background-color: rgb(105, 211, 176);
  box-shadow: 2px 2px 5px 0.1px rgb(150, 150, 150);
  border-radius: 50%;
  width: 50px;
  height: 50px;
  color: rgb(255, 255, 255);
  font-size: 24px;
  font-weight: 600;
  position: absolute;
  bottom: -60px;
  left: calc(50% - 25px);
  &:hover {
    background-color: rgb(95, 199, 164);
  }
  &:active {
    background-color: rgb(95, 199, 164);
    box-shadow: 1px 1px 2px 0.1px rgb(150, 150, 150) inset;
  }
`;

export const ResultSection = styled.section`
  width: 100%;
  height: calc(100vh- 143px);
  padding: 0px 18px 0px 23px;
  position: relative;
`;

export const ResultMsg = styled.div`
  width: 100%;
  height: 25px;
  margin-bottom: 20px;
  padding: 0px 0px 0px 13px;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const PageSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    width: 30px;
    margin: 0px 2px;
    text-align: center;
    font-size: 13px;
  }
`;

export const LeftPageBtn = styled(LeftArrowCircle)`
  border-radius: 50%;
  width: 21px;
  height: 21px;
  cursor: pointer;
`;

export const RightPageBtn = styled(RightArrowCircle)`
  border-radius: 50%;
  width: 21px;
  height: 21px;
  cursor: pointer;
`;

export const ResultLists = styled.ul`
  width: 100%;
  height: calc(100vh - 188px);
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 8px; // 스크롤바 너비
  }
  &::-webkit-scrollbar-thumb {
    height: 30%; //스크롤바 높이
    background: rgb(215, 215, 215); // 스크롤바 색
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: none; //스크롤바 배경 색
  }
`;

export const ResultList = styled.li`
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(215, 215, 215);
  box-shadow: 2px 2px 8px 0.01px rgb(131, 131, 131);
  border-radius: 12px;
  width: 98%;
  margin-bottom: 25px;
  padding: 15px;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
  &:hover {
    background-color: rgb(245, 245, 245);
  }
`;

export const ListHeader = styled.div``;

export const ResultOrder = styled.span`
  padding: 0px 20px 0px 20px;
  font-weight: 600;
`;

export const ResultContents = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;

export const ResultTitle = styled.div`
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  justify-content: start;
  align-items: center;

  span:nth-child(1) {
    max-width: 225px; // 모바일은 다르게 해줘야함.
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const ResultCategory = styled.span`
  margin-left: 10px;
  color: rgb(119, 119, 119);
  font-size: 9px;
  font-weight: normal;
`;

export const ResultAddress = styled.div`
  width: 100%;
  color: rgb(119, 119, 119);
  font-size: 11px;
`;

export const SideOpenBtn = styled(RightArrow)<{ mapMode: boolean }>`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 10px;
  right: -55px;
  cursor: pointer;
  path {
    fill: ${(props) =>
      props.mapMode ? "rgb(105, 211, 176)" : "rgb(250, 223, 132)"};
    stroke: ${(props) =>
      props.mapMode ? "rgb(105, 211, 176)" : "rgb(250, 223, 132)"};
  }
  &:hover {
    path {
      fill: ${(props) =>
        props.mapMode ? "rgb(95, 199, 164)" : "rgb(239, 212, 126)"};
      stroke: ${(props) =>
        props.mapMode ? "rgb(95, 199, 164)" : "rgb(239, 212, 126)"};
    }
  }
`;

export const SideCloseBtn = styled(LeftArrow)<{ mapMode: boolean }>`
  width: 40px;
  height: 40px;
  position: absolute;
  bottom: 10px;
  right: -55px;
  cursor: pointer;
  path {
    fill: ${(props) =>
      props.mapMode ? "rgb(105, 211, 176)" : "rgb(250, 223, 132)"};
    stroke: ${(props) =>
      props.mapMode ? "rgb(105, 211, 176)" : "rgb(250, 223, 132)"};
  }
  &:hover {
    path {
      fill: ${(props) =>
        props.mapMode ? "rgb(95, 199, 164)" : "rgb(239, 212, 126)"};
      stroke: ${(props) =>
        props.mapMode ? "rgb(95, 199, 164)" : "rgb(239, 212, 126)"};
    }
  }
`;

export const SetMode = styled(SetModeIcon)`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 10;
  transition: 300ms;
`;

export const MapMode = styled.div`
  position: absolute;
  top: 50px;
  right: 10px;
  z-index: 10;
  transition: 300ms;
`;

export const MapToggle = styled.button<{ mapMode: boolean }>`
  background-color: ${(props) =>
    props.mapMode ? "rgb(105, 211, 176)" : "rgb(250, 223, 132)"};
  border-radius: 5px;
  width: 75px;
  height: 27px;
  padding: 0px 7px;
  transition: 300ms;
  position: relative;
  display: flex;
  justify-content: ${(props) => (props.mapMode ? "start" : "end")};
  align-items: center;

  button {
    left: ${(props) => (props.mapMode ? "60px" : "2px")};
  }
  span {
    color: rgb(73, 73, 73);
  }
`;

export const MapToggleContent = styled.span``;

export const MapToggleBtn = styled.button`
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
  width: 13px;
  height: 23px;
  position: absolute;
  top: 2px;
  transition: 300ms;
`;
