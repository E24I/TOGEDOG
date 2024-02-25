import styled from "styled-components";
import { ReactComponent as MessageIcon } from "./../../assets/images/icons/Message.svg";

export const MapFeedContainer = styled.section`
  width: 100%;
  height: calc(100vh - 70px);
  padding: 29px 17px 0px 22px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const MapFeedMsg = styled.div`
  width: 100%;
  margin-bottom: 19px;
  text-align: center;
`;

export const MapFeedHeader = styled.div`
  width: 100%;
  padding: 0px 10px;
  font-size: 20px;
  margin-bottom: 15px;
`;

export const MapFeeds = styled.ul`
  width: 100%;
  height: calc(100vh - 174px);
  padding-right: 5px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: auto;
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
`;

export const MapFeedProfile = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;
export const MapFeedUserName = styled.span`
  margin-top: 6px;
  margin-left: 13px;
  font-size: 13px;
`;
export const MapFeedAdress = styled.span`
  font-size: 11px;
`;
export const MapFeedContents = styled.div`
  width: 100%;
  margin-bottom: 5px;
  padding: 8px;
`;
export const MapFeedTitle = styled.div`
  width: 100%;
  margin-bottom: 3px;
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;
export const MapFeedContent = styled.div`
  width: 100%;
  max-height: 2rem;
  line-height: 1rem;
  color: rgb(125, 125, 125);
  font-size: 11px;
  overflow: hidden;
`;
export const MapFeedMedia = styled.img`
  border-radius: 8px;
  width: 100%;
  height: 169px;
  margin-bottom: 10px;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;
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
