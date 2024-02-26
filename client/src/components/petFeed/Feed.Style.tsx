import styled from "styled-components";
import { ReactComponent as Dots } from "../../assets/images/icons/Dots.svg";
import { ReactComponent as Person } from "../../assets/images/icons/Person2.svg";
import { ReactComponent as PinMark } from "../../assets/images/icons/PinMark.svg";
import { ReactComponent as MessageIcon } from "../../assets/images/icons/Message.svg";
import { ReactComponent as Up_Circle } from "../../assets/images/icons/Up_Circle.svg";
import { ReactComponent as LeftArrowIcon } from "../../assets/images/icons/LeftArrow.svg";
import { ReactComponent as RightArrowIcon } from "../../assets/images/icons/RightArrow.svg";

export const Feed = styled.li`
  border-bottom: 3px solid rgb(215, 215, 215);
  width: 100%;
  max-width: 1000px;
  padding: 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  position: relative;
`;

export const FeedHeader = styled.div`
  width: 100%;
  max-width: 830px;
  margin: 0px 0px 5px 0px;
  padding: 0px 25px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const Profile = styled.div`
  max-height: 50px;
  margin: 5px 0px;
  display: flex;
  justify-content: start;
  align-items: center;
`;
export const Unknown = styled(Person)`
  width: 50px;
  height: 50px;
  path {
    fill: rgb(248, 210, 89);
  }
`;
export const ProfileInfo = styled.div`
  margin-left: 12px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: start;
`;
export const UserName = styled.button`
  margin-bottom: 2px;
  white-space: nowrap;
  font-size: 17px;
  font-weight: 600; // 지워달라고 요청함.
`;
export const UploadTime = styled.span`
  color: rgb(150, 150, 150);
  font-size: 11px;
  font-weight: 600;
`;

export const ProfileBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(215, 215, 215);
  display: flex;
  justify-content: center;
  align-items: center;

  /* border: 1px solid black; */
`;
// export const FeedAddress = styled.div`
//   font-size: 12px;
//   display: flex;
//   justify-content: start;
//   align-items: center;
// `;
export const PinPoint = styled(PinMark)`
  width: 15px;
  height: 15px;
  margin-left: 5px;

  path {
    fill: rgb(105, 211, 176);
  }
`;

export const SettingBox = styled.button`
  position: relative;
  width: 20px;
  height: 20px;
  margin: 0px 20px;
`;
export const SettingIcon = styled(Dots)`
  width: 20px;
  height: 20px;
  cursor: pointer;
  path {
    fill: rgb(200, 200, 200);
  }
`;

export const FeedContents = styled.div`
  width: 100%;
  max-width: 830px;
  padding: 10px 30px;
`;

export const FeedTitle = styled.div`
  width: 100%;
  padding: 0px 5px 10px 5px;
  font-size: 16px;
  font-weight: 600;
`;

export const ContentBox = styled.div`
  position: relative;
`;

export const FeedContent = styled.div`
  width: 100%;
  min-height: 41px;
  max-height: 3rem;
  line-height: 1.5rem;
  -webkit-line-clamp: 2;
  color: rgb(130, 130, 130);
  font-size: 14px;
  overflow: hidden;
  display: flex;
  &.show {
    display: block;
    max-height: none;
    overflow: auto;
    -webkit-line-clamp: unset;
  }
`;

export const MoreBtn = styled.button`
  width: 70px;
  max-height: 1.5rem;
  line-height: 1.5rem;
  color: rgb(130, 130, 130);
  font-size: 14px;
`;

export const MediaSection = styled.section`
  width: 100%;
  max-width: 830px;
  margin: 0px 0px 5px 0px;
  padding: 10px 25px;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const MediaBar = styled.div`
  border-radius: 15px;
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const MediaBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  scroll-behavior: smooth;
  overflow: hidden;
  overflow-x: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FeedMedia = styled.div`
  white-space: nowrap;
  display: flex;
  justify-content: start;
  align-items: center;

  video {
    margin-right: 20px;
  }

  img {
    margin-right: 20px;

    &:nth-last-child(1) {
      margin-right: 0px;
    }
  }
`;

export const FeedVideo = styled.video`
  background-color: rgb(215, 215, 215);
  border: 1px solid rgb(215, 215, 215);
  border-radius: 15px;
  width: 309px;
  height: 309px;
  object-fit: cover;
  z-index: 0;
`;

export const FeedImg = styled.img`
  background-color: rgb(215, 215, 215);
  border: 1px solid rgb(215, 215, 215);
  border-radius: 15px;
  width: 309px;
  height: 309px;
  object-fit: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const LeftBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 100%;
  z-index: 10;
  &:hover {
    background-color: rgb(1, 163, 255);
    filter: blur(30px);
    -webkit-filter: blur(30px);
  }
  &:active {
    background-color: rgb(1, 163, 255);
    filter: blur(20px);
    -webkit-filter: blur(20px);
  }
`;
export const RightBar = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 30px;
  height: 100%;
  z-index: 10;

  &:hover {
    background-color: rgb(1, 163, 255);
    filter: blur(30px);
    -webkit-filter: blur(30px);
  }
  &:active {
    background-color: rgb(1, 163, 255);
    filter: blur(20px);
    -webkit-filter: blur(20px);
  }
`;

export const LeftArrow = styled(LeftArrowIcon)`
  position: absolute;
  left: 0;
  width: 30px;
  height: 30px;
  margin: 10px;
`;
export const RightArrow = styled(RightArrowIcon)`
  position: absolute;
  right: 0;
  width: 30px;
  height: 30px;
  margin: 10px;
`;

export const FeedStatus = styled.div`
  width: 100%;
  max-width: 830px;
  padding: 5px 25px;
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

export const LeftStatus = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;

export const RightStatus = styled.div`
  display: flex;
  justify-content: start;
  align-items: start;
`;

export const LikeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  span {
    padding: 2px;
    font-size: 16px;
    font-weight: 600;
    color: rgb(110, 110, 110);
  }
`;

export const ReviewCount = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  span {
    padding: 2px;
    font-size: 16px;
    font-weight: 600;
    color: rgb(110, 110, 110);
  }
`;

export const Message = styled(MessageIcon)`
  width: 25px;
  height: 25px;
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

export const PaginationImage = styled.div`
  position: absolute;
  left: calc(50% - 35px);
  bottom: 10px;
  width: 70px;
`;

export const ScrollTop = styled.button`
  background-color: rgb(255, 255, 255);
  box-shadow: 1px 1px 2px 0.1px rgb(150, 150, 150);
  border-radius: 40px;
  width: 104px;
  height: 36px;
  font-size: 14px;
  position: fixed;
  bottom: 55px;
  left: calc(50vw - 52px);
`;

export const UpBtn = styled(Up_Circle)`
  width: 104px;
  height: 36px;
  position: fixed;
  bottom: 40px;
  right: 10px;
  cursor: pointer;
  path {
    fill: rgb(187, 187, 187);
  }
  &:hover {
    path {
      fill: rgb(73, 73, 73);
    }
  }
  &:active {
    path {
      fill: rgb(73, 73, 73);
    }
  }
`;
