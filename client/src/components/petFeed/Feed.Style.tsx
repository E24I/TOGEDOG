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
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const Profile = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
`;

export const ProfileBox = styled.div`
  width: 50px;
  height: 50px;
  margin: 0px 15px 0px 0px;
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
  margin-bottom: 5px;
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

export const Setting = styled(Dots)`
  width: 100%;
  max-width: 15px;
  height: 100%;
  max-height: 15px;
  margin: 0px 20px;
  cursor: pointer;
  path {
    fill: rgb(200, 200, 200);
  }
`;

export const FeedContents = styled.div`
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
  border: 1px solid rgb(215, 215, 215);
  border-radius: 15px;
  margin: 0px 0px 5px 0px;
  padding: 15px 5px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FeedImgs = styled.div`
  width: 880px;
  display: flex;
  justify-content: start;
  align-items: center;
  white-space: nowrap;
  overflow-x: auto;
`;

export const FeedImgBox = styled.div`
  border: 1px solid rgb(215, 215, 215);
  border-radius: 15px;
  height: 300px;
  margin: 10px;
  background-color: rgb(215, 215, 215);
`;

export const FeedImg = styled.img`
  border-radius: 15px;
  /* aspect-ratio: 7/6; */
  /* min-width: 350px; */
  height: 100%;
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

export const ReviewCount = styled.span`
  cursor: pointer;
`;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 40;
  width: 100vw;
  height: 100vh;
  background-color: rgb(215, 215, 215, 50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseModal = styled(Cancel)`
  position: absolute;
  top: 2%;
  right: -10%;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgb(215, 215, 215);
  font-size: 50px;
  cursor: pointer;
`;

export const LeftDetail = styled.div`
  width: 100%;
  max-width: calc(40vw - 70px);
  height: 100%;
  padding: 30px 0px;
`;

export const FeedDetailMedia = styled.div`
  width: 100%;
  max-width: 880px;
  height: 100%;
  max-height: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FeedDetailImgs = styled.div`
  width: 100%;
  max-width: 610px;
  height: 100%;
  max-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

export const FeedDetailImgBox = styled.div`
  width: 610px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FeedDetailImg = styled.img`
  border-radius: 15px;
  /* width: 610px;
  height: 600px; */
  max-width: 100%;
  max-height: 100%;
  background-size: auto 100%; // cover
  background-repeat: no-repeat;
  background-position: center;
  transition: 300ms;
`;

export const FeedDetailStatus = styled.div`
  width: 100%;
  padding: 10px 0px;
  display: flex;
  justify-content: start;
  align-items: start;
`;

export const RightDetail = styled.div`
  border-left: 1px solid rgb(215, 215, 215);
  width: 100%;
  max-width: calc(40vw - 70px);
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const FeedReviewTop = styled.div`
  width: 90%;
  margin: 0px 50px;
  padding: 20px 0px;
  border-bottom: 1px solid rgb(215, 215, 215);
`;

export const Replies = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
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
`;

export const ReplyProfile = styled.img`
  width: 30px;
  height: 30px;
`;

export const ReplyContents = styled.div`
  padding: 0px 5px;
`;

export const ReplyNickname = styled.div`
  padding: 5px 0px;
  font-weight: 600;
`;

export const ReplyContent = styled.div`
  padding: 5px 0px;
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

export const ReplyDate = styled.button`
  padding: 5px 20px 5px 0px;
`;

export const ReplyLikeCount = styled.button`
  padding: 5px 20px 5px 0px;
`;

export const ShowComment = styled.button`
  padding: 10px 10px;
  font-size: 14px;
`;

export const AddBox = styled.div`
  border-bottom: 1px solid rgb(215, 215, 215);
  /* border-radius: 12px; */
  width: 90%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export const AddReply = styled.input`
  padding: 0px 0px 5px 10px;
`;

export const AddBtn = styled.button`
  padding: 5px 15px;
`;

export const Comments = styled(Replies)``;
export const Comment = styled(Reply)``;
export const CommentLeft = styled(ReplyLeft)``;
export const CommentProfile = styled(ReplyProfile)``;
export const CommentContents = styled(ReplyContents)``;
export const CommentNickname = styled(ReplyNickname)``;
export const CommentContent = styled(ReplyContent)``;
