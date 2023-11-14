import styled from "styled-components";
import { ReactComponent as Dots } from "../../assets/images/icons/Dots.svg";
import { ReactComponent as Like } from "../../assets/images/icons/Heart.svg";
import { ReactComponent as Person } from "../../assets/images/icons/Person.svg";
import { ReactComponent as PinMark } from "../../assets/images/icons/PinMark.svg";
import { ReactComponent as BookMark } from "../../assets/images/icons/BookMark.svg";
import { ReactComponent as LeftArrow } from "../../assets/images/icons/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../assets/images/icons/RightArrow.svg";
import { ReactComponent as ImageCover } from "../../assets/images/icons/ImageCover.svg";

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
  width: 20px;
  height: 20px;
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

export const FeedLike = styled(Like)<{ isLike: boolean }>`
  width: 30px;
  height: 30px;
  margin: 0px 10px;
  cursor: pointer;
  path {
    fill: ${(props) => (props.isLike ? "red" : "rgb(215, 215, 215)")};
  }
  &:active {
    path {
      fill: red;
    }
  }
`;

export const FeedMark = styled(BookMark)`
  width: 30px;
  height: 30px;
  margin: 0px 10px;
  cursor: pointer;
`;

export const FeedBottom = styled.div`
  padding: 0px 50px;
`;

export const FeedReview = styled.span`
  cursor: pointer;
`;
