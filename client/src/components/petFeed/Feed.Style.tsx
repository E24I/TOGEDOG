import styled from "styled-components";
import { ReactComponent as Dots } from "../../assets/images/icons/Dots.svg";
import { ReactComponent as Person } from "../../assets/images/icons/Person.svg";
import { ReactComponent as PinMark } from "../../assets/images/icons/PinMark.svg";
import { ReactComponent as LeftArrow } from "../../assets/images/icons/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../assets/images/icons/RightArrow.svg";
import { ReactComponent as ImageCover } from "../../assets/images/icons/ImageCover.svg";
import { ReactComponent as Cancel } from "../../assets/images/icons/Cancel.svg";

export const Feed = styled.li`
  border-bottom: 1px solid rgb(215, 215, 215);
  width: 100%;
  max-width: 1100px;
  padding: 50px 70px;
`;

export const FeedHeader = styled.div`
  position: relative;
  width: 100%;
  max-height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Profile = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  cursor: pointer;
`;

export const ProfileBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(215, 215, 215);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
`;

export const Unknown = styled(Person)`
  width: 30px;
  height: 30px;
  path {
    fill: white;
  }
`;

export const UserName = styled.div`
  margin: 0px 0px 5px 15px;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 600;
`;

export const FeedAddress = styled.div`
  font-size: 12px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const PinPoint = styled(PinMark)`
  width: 15px;
  height: 15px;
  margin-right: 5px;
`;

export const UploadTime = styled.div`
  width: 100%;
  text-align: right;
`;

export const SettingBox = styled.button`
  position: relative;
  width: 25px;
  height: 20px;
  margin: 0px 20px;
`;

export const Setting = styled(Dots)`
  width: 20px;
  height: 20px;
  path {
    fill: rgb(200, 200, 200);
  }
`;

export const FeedContents = styled.div`
  width: 100%;
  min-height: 100px;
  padding: 10px 65px;
`;

export const FeedTitle = styled.div`
  width: 100%;
  padding: 10px 0px;
  font-weight: 600;
`;

export const FeedContent = styled.div`
  width: 100%;
  padding: 10px 0px;
`;

export const FeedMedia = styled.div`
  margin: 0px 0px 5px 0px;
  padding: 15px 5px;
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const FeedImgs = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  align-items: center;
  white-space: nowrap;
  overflow-x: auto;
  margin: 10px;
`;

export const FeedVideo = styled.video`
  border: 1px solid rgb(215, 215, 215);
  border-radius: 15px;
  height: 300px;
  margin-right: 20px;
  background-color: rgb(215, 215, 215);
`;

export const FeedImg = styled.img`
  border: 1px solid rgb(215, 215, 215);
  border-radius: 15px;
  height: 300px;
  margin-right: 20px;
  background-color: rgb(215, 215, 215);
  /* aspect-ratio: 7/6; */
  /* min-width: 350px; */
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;

export const LeftScroll = styled(LeftArrow)`
  min-width: 30px;
  height: 30px;
  margin: 10px;
`;
export const RightScroll = styled(RightArrow)`
  min-width: 30px;
  height: 30px;
  margin: 10px;
`;

export const FeedStatus = styled.div`
  width: 100%;
  padding: 20px 50px;
  display: flex;
  justify-content: start;
  align-items: start;
`;

export const LikeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;

export const FeedBottom = styled.div`
  padding: 0px 50px;
`;

export const ReviewCount = styled.button`
  padding: 2px;
  font-size: 16px;
  font-weight: 600;
  &:hover {
    color: rgb(101, 101, 101);
  }
  &:active {
    color: rgb(138, 138, 138);
  }
`;

export const ModalBackground = styled.div`
  background-color: rgb(215, 215, 215, 50%);
  z-index: 40;
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
`;

export const ReplyContent = styled.div`
  width: 100%;
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

export const FixedReply = styled.span`
  margin-left: 10px;
  font-size: 12px;
  font-weight: 400;
`;
