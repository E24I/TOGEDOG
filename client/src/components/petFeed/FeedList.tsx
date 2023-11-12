import React, { useState } from "react";
import { feedListsType } from "../../types/feedDataType";
import { ReactComponent as Dots } from "../../assets/images/icons/Dots.svg";
import { ReactComponent as Like } from "../../assets/images/icons/Heart.svg";
import { ReactComponent as Person } from "../../assets/images/icons/Person.svg";
import { ReactComponent as PinMark } from "../../assets/images/icons/PinMark.svg";
import { ReactComponent as BookMark } from "../../assets/images/icons/BookMark.svg";
import { ReactComponent as LeftArrow } from "../../assets/images/icons/LeftArrow.svg";
import { ReactComponent as RightArrow } from "../../assets/images/icons/RightArrow.svg";
import { ReactComponent as ImageCover } from "../../assets/images/icons/ImageCover.svg";
import styled from "styled-components";

interface OwnProps {
  items: feedListsType;
  handleMoreReview(): void;
}

type time = { type: string; time: number };

const FeedList: React.FC<OwnProps> = ({ items, handleMoreReview }) => {
  const today = new Date();
  const createDate = items.createDate;
  const feedDate = createDate.split("-").map((el) => parseInt(el));
  const createTime = items.createTime;
  const feedTime = createTime.split(":").map((el) => parseInt(el));

  return (
    <Feed>
      <FeedHeader>
        <Profile>
          <ProfileBox>
            {items.member.profileUrl ? (
              <ProfileImg src={items.member.profileUrl} alt="프로필 사진" />
            ) : (
              <Unknown />
            )}
          </ProfileBox>
          <div>
            <UserName>{items.member.nickname}</UserName>
            {items.address && (
              <FeedAddress>
                <PinPoint />
                {items.address}
              </FeedAddress>
            )}
          </div>
        </Profile>
        <UploadTime>
          {today.getFullYear() !== feedDate[0]
            ? `${today.getFullYear() - feedDate[0]}년 전`
            : today.getMonth() + 1 !== feedDate[1]
            ? `${today.getMonth() + 1 - feedDate[1]}개월 전`
            : today.getDate() !== feedDate[0]
            ? `${today.getDate() - feedDate[2]}일 전`
            : today.getHours() !== feedTime[0]
            ? `${today.getHours() - feedTime[0]}시간 전`
            : today.getMinutes() !== feedTime[1]
            ? `${today.getMinutes() - feedTime[1]}분 전`
            : `${today.getSeconds() - feedTime[2]}초 전`}
        </UploadTime>
        <Setting />
      </FeedHeader>
      <FeedContents>
        <FeedTitle>{items.title}</FeedTitle>
        <FeedContent>{items.content}</FeedContent>
      </FeedContents>
      {items.media.imgUrl && items.media.videoUrl && (
        <FeedMedia>
          <LeftScroll />
          <FeedImgs>
            {items.media.imgUrl?.map((el, idx) => (
              <FeedImgBox key={idx}>
                <FeedImg src={el} alt={`피드 이미지${idx + 1}`} />
              </FeedImgBox>
            ))}
            {items.media.videoUrl && (
              <FeedImgBox>{items.media.videoUrl}</FeedImgBox>
            )}
          </FeedImgs>
          <RightScroll />
        </FeedMedia>
      )}
      <FeedStatus>
        <LikeBox>
          <FeedLike />
          <span>{items.likeCount}</span>
        </LikeBox>
        <FeedMark />
      </FeedStatus>
      <FeedBottom>
        <FeedReview onClick={handleMoreReview}>
          댓글 {items.replyCount}개 모두 보기
        </FeedReview>
      </FeedBottom>
    </Feed>
  );
};

export default FeedList;

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
  position: absolute;
  right: 6%;
`;

export const Setting = styled(Dots)`
  position: absolute;
  right: 2%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  path {
    fill: rgb(200, 200, 200);
  }
`;

export const FeedContents = styled.div`
  padding: 10px 50px;
`;

export const FeedTitle = styled.div`
  width: 100%;
  padding: 10px;
  font-weight: 600;
`;

export const FeedContent = styled.div`
  width: 100%;
  padding: 10px;
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

export const FeedLike = styled(Like)`
  width: 30px;
  height: 30px;
  margin: 0px 10px;
  cursor: pointer;
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
