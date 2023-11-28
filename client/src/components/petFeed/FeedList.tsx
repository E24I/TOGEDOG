import React, { useState } from "react";
import { feedListsType } from "../../types/feedDataType";
import FeedDetail from "./FeedDetail";
import {
  Feed,
  FeedHeader,
  Profile,
  ProfileBox,
  ProfileImg,
  Unknown,
  UserName,
  FeedAddress,
  PinPoint,
  UploadTime,
  FeedContents,
  FeedTitle,
  FeedContent,
  FeedMedia,
  FeedImgs,
  FeedImgBox,
  FeedImg,
  LeftScroll,
  RightScroll,
  FeedStatus,
  LikeBox,
  FeedBottom,
  ReviewCount,
  Setting,
  SettingBox,
} from "./Feed.Style";
import Heart from "../../atoms/button/Heart";
import Bookmark from "../../atoms/button/Bookmark";
import Dropdown from "../../atoms/dropdown/Dropdowns";

interface OwnProps {
  items: feedListsType;
}

const FeedList: React.FC<OwnProps> = ({ items }) => {
  const [isDetail, setDetail] = useState<boolean>(false);
  const [isLike, setLike] = useState<boolean>(false);
  const [isBookmark, setBookmark] = useState<boolean>(false);
  const [isSetting, setSetting] = useState<boolean>(false);
  const today = new Date();
  const createDate = items.createDate;
  const feedDate = createDate.split("-").map((el) => parseInt(el));
  const createTime = items.createTime;
  const feedTime = createTime.split(":").map((el) => parseInt(el));

  const handleMoreReview = (): void => setDetail(!isDetail);
  const handleLike = (): void => setLike(!isLike);
  const handleBookmark = (): void => setBookmark(!isBookmark);
  const handleSetting = (): void => setSetting(!isSetting);

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
        <SettingBox onClick={handleSetting} onBlur={() => setSetting(false)}>
          <Setting />
          {isSetting && (
            <Dropdown
              contents={["신고하기1", "신고하기2", "신고하기3"]}
              handleFunc={(e) => {
                console.log(e.currentTarget.textContent);
                setSetting(false);
              }}
            />
          )}
        </SettingBox>
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
          <Heart
            width="30px"
            height="30px"
            isLike={isLike}
            handleCustomEvent={handleLike}
          />
          <span>{items.likeCount}</span>
        </LikeBox>
        <Bookmark
          width="30px"
          height="30px"
          isBookmark={isBookmark}
          handleCustomEvent={handleBookmark}
        />
      </FeedStatus>
      <FeedBottom>
        <ReviewCount onClick={handleMoreReview}>
          댓글 {items.replyCount}개 모두 보기
        </ReviewCount>
      </FeedBottom>
      {isDetail && (
        <FeedDetail feedId={items.feedId} handleMoreReview={handleMoreReview} />
      )}
    </Feed>
  );
};

export default FeedList;
