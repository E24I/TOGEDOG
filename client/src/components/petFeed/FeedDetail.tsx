import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  FeedAddress,
  FeedContent,
  FeedContents,
  FeedHeader,
  FeedLike,
  FeedMark,
  FeedReview,
  FeedTitle,
  LeftScroll,
  LikeBox,
  PinPoint,
  Profile,
  ProfileBox,
  ProfileImg,
  RightScroll,
  Setting,
  Unknown,
  UploadTime,
  UserName,
} from "./Feed.Style";
import { feedDetailType } from "../../types/feedDataType";
import { feedDetailData } from "./FeedDummy";

interface OwnProps {
  feedId: number;
  handleMoreReview(): void;
}

const FeedDetail: React.FC<OwnProps> = ({ feedId, handleMoreReview }) => {
  const [isDetail, setDetail] = useState<feedDetailType>(feedDetailData);
  const [isLike, setLike] = useState<boolean>(false);
  const [isImg, setImg] = useState<number>(1);
  const today = new Date();
  const createDate = isDetail.createDate;
  const feedDate = createDate.split("-").map((el) => parseInt(el));
  const createTime = isDetail.createTime;
  const feedTime = createTime.split(":").map((el) => parseInt(el));

  const handleLike = (): void => setLike(!isLike);
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
        <CloseModal onClick={handleMoreReview}>&times;</CloseModal>
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
            <FeedMedia>
              <LeftScroll onClick={handlePrevImg} />
              <FeedImgs>
                {isDetail.media.imgUrl?.map((el, idx) => {
                  if (isImg === idx + 1) {
                    return (
                      <FeedImgBox key={idx}>
                        <FeedImg src={el} alt={`피드 이미지${idx + 1}`} />
                      </FeedImgBox>
                    );
                  }
                })}
                {isDetail.media.videoUrl &&
                  isDetail.media.imgUrl?.length + 1 === isImg && (
                    <FeedImgBox>{isDetail.media.videoUrl}</FeedImgBox>
                  )}
              </FeedImgs>
              <RightScroll onClick={handleNextImg} />
            </FeedMedia>
          )}
          <FeedStatus>
            <LikeBox>
              <FeedLike isLike={isLike} onClick={handleLike} />
              <span>{isDetail.likeCount}</span>
            </LikeBox>
            <FeedMark />
          </FeedStatus>
        </LeftDetail>
        <RightDetail>
          <FeedReviewBox>
            <FeedReview onClick={handleMoreReview}>
              댓글 {isDetail.replyCount}개
            </FeedReview>
          </FeedReviewBox>
          <ul>
            <li>
              <div>프로필 사진</div>
              <div>
                <div>닉네임</div>
                <div>
                  <div>댓글 내용</div>
                  <div>좋아요 버튼</div>
                </div>
                <div>
                  <span>작성 시간</span>
                  <span>좋아요 n개</span>
                  <span>답글달기 버튼</span>
                  <span>...</span>
                </div>
                <div>답글 보기(개수) / 답글 숨기기</div>
                <ul>
                  <li>
                    <div>프로필 사진</div>
                    <div>
                      <div>닉네임</div>
                      <div>
                        <span>@태그</span>
                        <span>답글 내용</span>
                      </div>
                    </div>
                    <div>
                      <input placeholder="답글 달기..." />
                      <button>게시</button>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
            <div>
              <input placeholder="댓글 달기..." />
              <button>게시</button>
            </div>
          </ul>
        </RightDetail>
      </DetailContainer>
    </ModalBackground>
  );
};

export default FeedDetail;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
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
  padding: 50px 0px;
  aspect-ratio: 1.5/1;
  background-color: white;
  border-radius: 20px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CloseModal = styled.button`
  position: absolute;
  top: 2%;
  right: -10%;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
  font-size: 50px;
`;

export const LeftDetail = styled.div`
  width: 50%;
  height: 100%;
  margin: 50px 0px 50px 50px;
  padding: 30px 0px;
`;

const FeedMedia = styled.div`
  width: 100%;
  max-width: 880px;
  height: 100%;
  max-height: 600px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FeedImgs = styled.div`
  width: 100%;
  max-width: 610px;
  height: 100%;
  max-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const FeedImgBox = styled.div`
  width: 610px;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FeedImg = styled.img`
  border-radius: 15px;
  width: 610px;
  height: 600px;
  background-size: auto 100%;
  background-repeat: no-repeat;
  background-position: center;
  transition: 300ms;
`;

const FeedStatus = styled.div`
  width: 100%;
  padding: 10px 0px;
  display: flex;
  justify-content: start;
  align-items: start;
`;

export const RightDetail = styled.div`
  border: 1px solid black;
  width: 50%;
  height: 100%;
  margin: 50px 50px 50px 0px;
  overflow-y: scroll;
`;

export const FeedReviewBox = styled.div`
  margin: 0px 50px;
  padding: 20px 0px;
  border-bottom: 1px solid rgb(215, 215, 215);
`;
