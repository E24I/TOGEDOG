import styled from "styled-components";
import { ReactComponent as Dots } from "../../assets/images/icons/Dots.svg";
import { ReactComponent as Person } from "../../assets/images/icons/Person2.svg";
import { ReactComponent as PinMark } from "../../assets/images/icons/PinMark.svg";
import { ReactComponent as LeftArrowIcon } from "../../assets/images/icons/LeftArrow.svg";
import { ReactComponent as RightArrowIcon } from "../../assets/images/icons/RightArrow.svg";
import { ReactComponent as Cancel } from "../../assets/images/icons/Cancel.svg";
import { ReactComponent as MessageIcon } from "../../assets/images/icons/Message.svg";
import { ReactComponent as Up_Circle } from "../../assets/images/icons/Up_Circle.svg";

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

  /* border: 1px solid black; */
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

  /* border: 1px solid black; */
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
  width: 25px;
  height: 20px;
  margin: 0px 20px;
`;
export const SettingIcon = styled(Dots)`
  width: 20px;
  height: 20px;
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
  display: flex;
  -webkit-line-clamp: 2;
  overflow: hidden;
  color: rgb(130, 130, 130);
  font-size: 14px;
  &.show {
    display: block;
    max-height: none;
    overflow: auto;
    -webkit-line-clamp: unset;
  }

  /* border: 1px solid black; */
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

  /* border: 1px solid black; */
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

  /* border: 1px solid black; */
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

  /* border: 1px solid black; */

  // 드래그 금지
  -webkit-touch-callout: none;
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
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

  /* border: 1px solid black; */
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
    fill: rgb(110, 110, 110);
  }
  &:hover {
    path {
      fill: rgb(110, 110, 110);
    }
  }
  &:active {
    path {
      fill: rgb(110, 110, 110);
    }
  }
`;
export const ModalBackground = styled.div`
  background-color: rgb(215, 215, 215, 50%);
  z-index: 50;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
`;

export const DetailContainer = styled.div`
  width: 100%;
  max-width: 80vw;
  max-height: 100vh;
  padding: 50px 50px;
  aspect-ratio: 1.5/1;
  background-color: white;
  border-radius: 20px;
  position: relative;
  display: grid;
  justify-items: center;

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(1, 100%);
    overflow-y: auto;
    overflow-x: visible;

    &::-webkit-scrollbar {
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      height: 30%;
      background: gray;
      border-radius: 10px;
    }

    &::-webkit-scrollbar-track {
      background: rgb(0, 0, 0, 0);
    }
  }

  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(2, 50%);
    grid-template-rows: repeat(1, 100%);
  }
`;

export const CloseModal = styled(Cancel)`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgb(215, 215, 215);
  font-size: 50px;
  cursor: pointer;
`;

export const LeftDetail = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  @media screen and (min-width: 1200px) {
    max-width: 40vw;
  }
`;

export const RightDetail = styled.div`
  width: 100%;
  height: 100%;
  padding-left: 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  @media screen and (min-width: 1200px) {
    max-width: 40vw;
    border-left: 1px solid rgb(215, 215, 215);
  }
`;

export const FeedDetailMedia = styled.div`
  width: 100%;
  max-width: 880px;
  max-height: calc(100% - 240px);
  min-height: calc(100% - 240px);
  padding: 0px 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

export const FeedDetailImgs = styled.div`
  width: 100%;
  height: 100%;
  margin: 0px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FeedDetailImg = styled.img`
  border-radius: 15px;
  width: 100%;
  height: 100%;
  background-size: auto 100%; // cover
  background-repeat: no-repeat;
  background-position: center;
`;

export const FeedDetailVideo = styled.video`
  border-radius: 15px;
  width: 100%;
  height: 100%;
  background-size: auto 100%; // cover
  background-repeat: no-repeat;
  background-position: center;
`;

export const PaginationImage = styled.div`
  position: absolute;
  left: calc(50% - 35px);
  bottom: 10px;
  width: 70px;
`;

export const FeedDetailStatus = styled.div`
  width: 100%;
  padding: 10px 55px;
  display: flex;
  justify-content: start;
  align-items: start;
`;

export const FeedReviewTop = styled.div`
  border-bottom: 1px solid rgb(215, 215, 215);
  width: 90%;
  padding: 10px 5px;
`;

export const Replies = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  overflow-y: auto;
  overflow-x: visible;
`;

export const Reply = styled.li`
  width: 100%;
  padding: 20px 15px;
  display: flex;
  justify-content: start;
  align-items: start;
`;

export const ReplyLeft = styled.div`
  min-width: 50px;
  min-height: 50px;
  margin: 0px 10px;
  border-radius: 50%;
  background-color: rgb(215, 215, 215);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export const ReplyProfile = styled.img`
  width: 30px;
  height: 30px;
`;

export const ReplyContents = styled.div`
  width: 100%;
  padding: 0px 5px;
`;

export const ReplyNickname = styled.div`
  padding: 5px 0px;
  font-weight: 600;
  cursor: pointer;
`;

export const FixedReply = styled.span`
  margin-left: 10px;
  font-size: 12px;
  font-weight: 400;
`;

export const ReplyContent = styled.div`
  padding: 5px 0px;
`;

export const ReplyEditBox = styled.input`
  background-color: rgb(245, 245, 245);
  width: 100%;
  padding: 5px 5px;
  font-size: 16px;
`;

export const ReplySetting = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Mentions = styled.span`
  margin-right: 5px;
  color: #71bddb;
  font-weight: 600;
`;

export const ReplyDate = styled.span`
  padding: 5px 10px 5px 0px;
`;

export const ReplyLikeCount = styled.span`
  padding: 5px 10px 5px 0px;
`;

export const ShowComment = styled.button`
  padding: 10px 10px;
  font-size: 14px;
`;

export const AddBox = styled.div`
  border-bottom: 1px solid rgb(215, 215, 215);
  width: 90%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export const AddReply = styled.input`
  padding: 5px 0px 5px 10px;
  width: 100%;
  height: 30px;
`;

export const AddBtn = styled.button`
  padding: 5px 15px;
  min-width: 60px;
  height: 30px;
`;

export const Comments = styled(Replies)``;
export const Comment = styled(Reply)``;
export const CommentLeft = styled(ReplyLeft)``;
export const CommentProfile = styled(ReplyProfile)``;
export const CommentContents = styled(ReplyContents)``;
export const CommentHeader = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;
export const CommentNickname = styled(ReplyNickname)``;
export const CommentContent = styled(ReplyContent)``;

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
      fill: rgb(177, 177, 177);
    }
  }
  &:active {
    path {
      fill: rgb(177, 177, 177);
    }
  }
`;
