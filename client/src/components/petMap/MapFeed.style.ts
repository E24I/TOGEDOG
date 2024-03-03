import styled from "styled-components";
import { ReactComponent as MessageIcon } from "./../../assets/images/icons/Message.svg";

export const MapFeedContainer = styled.section`
  width: 100%;
  height: calc(100vh - 70px);
  padding: 29px 17px 0px 22px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;

  @media screen and (max-width: 500px) {
    height: 245px;
    padding: 10px 10px 0px 10px;
  }
`;

export const MapFeedMsg = styled.div`
  width: 100%;
  margin-bottom: 19px;
  text-align: center;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const MapFeedHeader = styled.div`
  width: 100%;
  padding: 0px 10px;
  font-size: 20px;
  margin-bottom: 15px;
  @media screen and (max-width: 500px) {
    margin: 5px 0px;
    padding: 0px 10px;
    font-size: 15px;
  }
`;

export const MapFeeds = styled.ul`
  @media screen and (min-width: 500px) {
    width: 100%;
    height: calc(100vh - 174px);
    padding-right: 5px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
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
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    padding: 5px 10px;
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: start;
    overflow-x: auto;
    &::-webkit-scrollbar {
      height: 8px; // 스크롤바 너비
    }
    &::-webkit-scrollbar-thumb {
      width: 30%; //스크롤바 높이
      background: rgb(215, 215, 215); // 스크롤바 색
      border-radius: 10px;
    }
    &::-webkit-scrollbar-track {
      background: none; //스크롤바 배경 색
    }
  }
`;

export const MapFeed = styled.li`
  background-color: white;
  box-shadow: 1px 1px 4px 0.01px rgb(131, 131, 131);
  border-radius: 17px;
  width: 100%;
  margin-bottom: 25px;
  padding: 10px 12px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  position: relative;
  &:hover {
    .cover {
      display: flex;
    }
  }
  @media screen and (max-width: 500px) {
    min-width: 370px;
    height: 100%;
    min-height: 180px;
    margin: 0px 15px 0px 0px;
    flex-direction: row;
  }
`;

export const MapFeedContents = styled.div`
  width: 100%;
  margin-bottom: 5px;
  @media screen and (max-width: 500px) {
    width: 100%;
    margin-bottom: 0px;
    padding: 5px 8px;
  }
`;
export const MapFeedProfile = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;

  @media screen and (min-width: 500px) {
    margin: 3px 0px 6px 3px;
  }
  @media screen and (max-width: 500px) {
    margin: 0px 0px 10px 0px;
  }
`;
export const MapFeedUserName = styled.span`
  margin-top: 6px;
  margin-left: 10px;
  font-size: 13px;
`;
export const MapFeedTitle = styled.div`
  width: 100%;
  margin: 3px 0px;
  padding: 0px 8px;
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  @media screen and (max-width: 500px) {
    max-width: 200px;
    font-size: 14px;
  }
`;
export const MapFeedContent = styled.div`
  width: 100%;
  max-height: 2rem;
  margin: 3px 8px;
  line-height: 1rem;
  color: rgb(125, 125, 125);
  font-size: 11px;
  overflow: hidden;
  @media screen and (max-width: 500px) {
    display: none;
  }
`;

export const MapFeedBottom = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
  @media screen and (max-width: 500px) {
    height: 100%;
    justify-content: end;
    align-items: end;
  }
`;

export const MapFeedMedia = styled.img`
  border-radius: 8px;
  width: 100%;
  height: 169px;
  margin-bottom: 10px;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;
  @media screen and (max-width: 500px) {
    width: 130px;
    height: 130px;
  }
`;
export const MapFeedStatus = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: start;
`;
export const MapFeedLike = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  span {
    font-size: 11px;
  }
`;
export const MapFeedReply = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  span {
    font-size: 11px;
  }
`;
export const Message = styled(MessageIcon)`
  width: 20px;
  height: 20px;
  margin: 0px 10px;
  cursor: pointer;

  path {
    fill: rgb(187, 187, 187);
  }
  &:hover {
    path {
      stroke: rgb(73, 73, 73);
      fill: rgb(73, 73, 73);
    }
  }
  &:active {
    path {
      stroke: rgb(73, 73, 73);
      fill: rgb(73, 73, 73);
    }
  }
`;
export const MapFeedCover = styled.button`
  background-color: rgba(73, 73, 73, 0.7);
  border-radius: 17px;
  width: calc(100% + 2px);
  height: calc(100% + 2px);
  display: none;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  span {
    color: rgb(255, 255, 255);
    font-size: 18px;
  }
`;
