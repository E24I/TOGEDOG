import React, { useEffect, useState } from "react";
import {
  AddBox,
  AddBtn,
  AddReply,
  CloseModal,
  DetailContainer,
  FeedAddress,
  FeedContent,
  FeedContents,
  FeedDetailImg,
  FeedDetailImgBox,
  FeedDetailImgs,
  FeedDetailMedia,
  FeedDetailStatus,
  FeedHeader,
  FeedTitle,
  LeftDetail,
  LeftScroll,
  LikeBox,
  ModalBackground,
  PinPoint,
  Profile,
  ProfileBox,
  ProfileImg,
  RightDetail,
  RightScroll,
  Setting,
  Unknown,
  UploadTime,
  UserName,
} from "./Feed.Style";
import { feedDetailType } from "../../types/feedDataType";
import { feedDetailData } from "./FeedDummy";
import FeedReply from "./FeedReply";
import Heart from "../../atoms/button/Heart";
import Bookmark from "../../atoms/button/Bookmark";

interface OwnProps {
  feedId: number;
  handleMoreReview(): void;
}

const FeedDetail: React.FC<OwnProps> = ({ feedId, handleMoreReview }) => {
  const [isDetail, setDetail] = useState<feedDetailType>(feedDetailData);
  const [isLike, setLike] = useState<boolean>(false);
  const [isBookmark, setBookmark] = useState<boolean>(false);
  const [isImg, setImg] = useState<number>(1);
  const today = new Date();
  const createDate = isDetail.createDate;
  const feedDate = createDate.split("-").map((el) => parseInt(el));
  const createTime = isDetail.createTime;
  const feedTime = createTime.split(":").map((el) => parseInt(el));

  const handleLike = (): void => setLike(!isLike);
  const handleBookmark = (): void => setBookmark(!isBookmark);
  const handlePrevImg = (): void => {
    if (!isDetail.media.imgUrl || !isDetail.media.videoUrl) return;
    if (isImg !== 1) {
      setImg(isImg - 1);
    }
  };
  const handleNextImg = (): void => {
    if (!isDetail.media.imgUrl || !isDetail.media.videoUrl) return;
    if (
      isImg !==
      isDetail.media.imgUrl.length + isDetail.media.videoUrl.length
    ) {
      setImg(isImg + 1);
    }
  };

  useEffect(() => {
    setDetail(feedDetailData);
  }, []);

  return (
    <ModalBackground onClick={handleMoreReview}>
      <DetailContainer
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CloseModal onClick={handleMoreReview} />
        <LeftDetail>
          <FeedHeader>
            <Profile>
              <ProfileBox>
                {isDetail.member.profileUrl ? (
                  <ProfileImg
                    src={isDetail.member.profileUrl}
                    alt="프로필 사진"
                  />
                ) : (
                  <Unknown />
                )}
              </ProfileBox>
              <div>
                <UserName>{isDetail.member.nickname}</UserName>
                {isDetail.address && (
                  <FeedAddress>
                    <PinPoint />
                    {isDetail.address}
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
            <FeedTitle>{isDetail.title}</FeedTitle>
            <FeedContent>{isDetail.content}</FeedContent>
          </FeedContents>
          {isDetail.media.imgUrl && isDetail.media.videoUrl && (
            <FeedDetailMedia>
              <LeftScroll onClick={handlePrevImg} />
              <FeedDetailImgs>
                {isDetail.media.imgUrl?.map((el, idx) => {
                  if (isImg === idx + 1) {
                    return (
                      <FeedDetailImgBox key={idx}>
                        <FeedDetailImg src={el} alt={`피드 이미지${idx + 1}`} />
                      </FeedDetailImgBox>
                    );
                  }
                })}
                {isDetail.media.videoUrl &&
                  isDetail.media.imgUrl?.length + 1 === isImg && (
                    <FeedDetailImgBox>
                      {isDetail.media.videoUrl}
                    </FeedDetailImgBox>
                  )}
              </FeedDetailImgs>
              <RightScroll onClick={handleNextImg} />
            </FeedDetailMedia>
          )}
          <FeedDetailStatus>
            <LikeBox>
              <Heart
                width="30px"
                height="30px"
                isLike={isLike}
                handleCustomEvent={handleLike}
              />
              <span>{isDetail.likeCount}</span>
            </LikeBox>
            <Bookmark
              width="30px"
              height="30px"
              isBookmark={isBookmark}
              handleCustomEvent={handleBookmark}
            />
          </FeedDetailStatus>
        </LeftDetail>
        <RightDetail>
          <FeedReply />
          <AddBox>
            <AddReply placeholder="댓글 달기..." />
            <AddBtn>게시</AddBtn>
          </AddBox>
        </RightDetail>
      </DetailContainer>
    </ModalBackground>
  );
};

export default FeedDetail;
