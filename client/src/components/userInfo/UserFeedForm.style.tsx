import { styled } from "styled-components";
import { ReactComponent as Feeds } from "../../assets/images/icons/Feeds.svg";
import { ReactComponent as Heart } from "../../assets/images/icons/HeartFalse.svg";
import { ReactComponent as BookMark } from "../../assets/images/icons/BookmarkFalse.svg";
import { ReactComponent as Logo } from "../../assets/images/logos/Logo.svg";

export const MyFeedContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  float: left;
`;
export const TapContainer = styled.div`
  width: 708px;
  height: 70px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
`;
export const TapMenuOff = styled.div`
  width: 236px;
  height: 70px;
  path {
    fill: #d7d7d7;
  }
  button {
    margin: 0 auto;
    width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
export const TapMenuOn = styled.div`
  width: 236px;
  height: 70px;
  border-bottom: 3px solid black;
  path {
    fill: black;
  }
  button {
    margin: 0 auto;
    width: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;
export const FeedContainer = styled.div`
  border-top: 1px solid #d7d7d7;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 1.5px;
`;
export const NoneFeedBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const MyFeeds = styled(Feeds)``;
export const Hearts = styled(Heart)`
  width: 36px;
  height: 36px;
`;
export const BookMarks = styled(BookMark)`
  width: 36px;
  height: 36px;
`;
export const LogoImg = styled(Logo)`
  margin-top: 20px;
`;
