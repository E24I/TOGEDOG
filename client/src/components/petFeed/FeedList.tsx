import React from "react";
import { feedList } from "../../types/feedDataType";
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
  items: feedList;
}

const FeedList: React.FC<OwnProps> = ({ items }) => {
  const today = new Date();

  return (
    <li>
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
            <FeedAddress>
              <PinMark />
              {items.address}
            </FeedAddress>
          </div>
        </Profile>
        <UploadTime>{items.createDate}</UploadTime>
        <UploadTime>{today.getFullYear()}</UploadTime>
        <UploadTime>{today.getMonth() + 1}</UploadTime>
        <UploadTime>{today.getDate()}</UploadTime>
        <Dots />
      </FeedHeader>
      <div>
        <div>{items.title}</div>
        <div>{items.content}</div>
      </div>
      {items.media && (
        <>
          <LeftArrow />
          <ul>
            {items.media.imgUrl &&
              items.media.imgUrl.map((el, idx) => <li key={idx}>{el}</li>)}
            {items.media.videoUrl && <li>{items.media.videoUrl}</li>}
          </ul>
          <RightArrow />
        </>
      )}
      <div>
        <div>
          <Like />
          <span>{items.likeCount}</span>
        </div>
        <BookMark />
      </div>
      <div>
        <span>댓글 {items.replyCount}개</span>
      </div>
    </li>
  );
};

export default FeedList;

export const FeedHeader = styled.div`
  border: 1px solid black;
  width: 100%;
  position: relative;
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
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: rgb(215, 215, 215);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ProfileImg = styled.img``;

export const Unknown = styled(Person)`
  width: 30px;
  height: 30px;
  path {
    fill: white;
  }
`;

export const UserName = styled.div`
  border: 1px solid black;
`;
export const FeedAddress = styled.div`
  border: 1px solid black;
`;
export const UploadTime = styled.div`
  border: 1px solid black;
`;
