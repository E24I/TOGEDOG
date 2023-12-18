import React, { useState } from "react";
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
  FeedDetailImgs,
  FeedDetailMedia,
  FeedDetailStatus,
  FeedDetailVideo,
  FeedHeader,
  FeedReviewTop,
  FeedTitle,
  LeftDetail,
  LeftScroll,
  LikeBox,
  ModalBackground,
  PaginationImage,
  PinPoint,
  Profile,
  ProfileBox,
  ProfileImg,
  Replies,
  ReviewCount,
  RightDetail,
  RightScroll,
  Setting,
  SettingBox,
  Unknown,
  UploadTime,
  UserName,
} from "./Feed.Style";
import FeedReply from "./FeedReply";
import Heart from "../../atoms/button/Heart";
import Bookmark from "../../atoms/button/Bookmark";
import Dropdown from "../../atoms/dropdown/Dropdowns";
import PaginationCircle from "../../atoms/pagination/PaginationCircle";
import FeedImage from "./FeedImage";
import { useFeedBookmark, useFeedLike, useGetFeed } from "../../hooks/FeedHook";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../atoms";
import { usePostReply } from "../../hooks/ReplyHook";

interface OwnProps {
  feedId: number;
  handleMoreReview(): void;
}

const FeedDetail: React.FC<OwnProps> = ({ feedId, handleMoreReview }) => {
  const accesstoken = useRecoilValue(tokenAtom);
  const { data, error, isLoading } = useGetFeed(feedId, accesstoken);
  const { mutate: feedLike } = useFeedLike(feedId, accesstoken);
  const { mutate: feedBookmark } = useFeedBookmark(feedId, accesstoken);
  console.log("feedDetail", data);

  const [isImg, setImg] = useState<number>(1);
  const [isSetting, setSetting] = useState<boolean>(false);
  const [bigImage, setBigImage] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");

  const handleOpenDropdown = () => setSetting(!isSetting);
  const handleCloseDropdown = () => setSetting(false);
  const handleBigImg = (url = ""): void => {
    setBigImage(!bigImage);
    setImgUrl(url);
  };

  const today = new Date();
  const createDate = data?.createdDate.split("T")[0];
  const feedDate = createDate?.split("-").map((el: string) => parseInt(el));
  const createTime = data?.createdDate.split("T")[1];
  const feedTime = createTime?.split(":").map((el: string) => parseInt(el));

  const handlePrevImg = (): void => {
    if (!data.images || !data.videos) return;
    if (isImg !== 1) {
      setImg(isImg - 1);
    }
  };
  const handleNextImg = (): void => {
    if (!data.images || !data.videos) return;
    if (isImg !== data.images.length + data.videos.length) {
      setImg(isImg + 1);
    }
  };

  const [isInput, setInput] = useState("");
  const handleChangeReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const successFunc = () => setInput("");
  const { mutate: postReply } = usePostReply(
    feedId,
    isInput,
    accesstoken,
    successFunc,
  );
  const handleEnterReply = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      console.log(e.key);
      postReply();
    }
  };

  const handleReplyPatch = () => {
    return;
  };
  const handleReplyDelete = () => {
    return;
  };
  const settingContent = {
    수정하기: handleReplyPatch,
    삭제하기: handleReplyDelete,
  };

  if (isLoading) {
    return <>로딩중</>;
  }
  if (error) {
    return <>오류 발생</>;
  }
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
                {data.member?.imageUrl ? (
                  <ProfileImg src={data.member?.imageUrl} alt="프로필 사진" />
                ) : (
                  <Unknown />
                )}
              </ProfileBox>
              <div>
                <UserName>{data.member?.nickname}</UserName>
                {data.address && (
                  <FeedAddress>
                    <PinPoint />
                    {data.address}
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
            <SettingBox
              onClick={handleOpenDropdown}
              onBlur={handleCloseDropdown}
            >
              <Setting />
              {isSetting && (
                <Dropdown
                  setting={settingContent}
                  handleCloseDropdown={handleCloseDropdown}
                />
              )}
            </SettingBox>
          </FeedHeader>
          <FeedContents>
            <FeedTitle>{data.title}</FeedTitle>
            <FeedContent>{data.content}</FeedContent>
          </FeedContents>
          {data.images && data.videos && (
            <FeedDetailMedia>
              <LeftScroll onClick={handlePrevImg} />
              <FeedDetailImgs>
                {data.images?.map((el: string, idx: number) => {
                  if (isImg === idx + 1) {
                    return (
                      <FeedDetailImg
                        key={idx}
                        src={el}
                        alt={`피드 이미지${idx + 1}`}
                        onClick={() => {
                          handleBigImg(el);
                        }}
                      />
                    );
                  }
                })}
                {data.videos && data.images.length + 1 === isImg && (
                  <FeedDetailVideo src={data.videos} />
                )}
              </FeedDetailImgs>
              <RightScroll onClick={handleNextImg} />
              <PaginationImage>
                <PaginationCircle
                  isPage={isImg}
                  totalPage={
                    data.videos ? 1 + data.images.length : data.images.length
                  }
                  handleFunc={(el) => {
                    setImg(el);
                  }}
                />
              </PaginationImage>
            </FeedDetailMedia>
          )}
          <FeedDetailStatus>
            <LikeBox>
              <Heart
                width="30px"
                height="30px"
                isLike={data.likeYn}
                handleFunc={feedLike}
              />
              <span>{data.likeCount}</span>
            </LikeBox>
            <Bookmark
              width="30px"
              height="30px"
              isBookmark={data.bookmarkYn}
              handleFunc={feedBookmark}
            />
          </FeedDetailStatus>
        </LeftDetail>
        <RightDetail>
          <FeedReviewTop>
            <ReviewCount>
              댓글 {data.replies.pageInformation.totalSize}개
            </ReviewCount>
          </FeedReviewTop>
          <Replies>
            {data.replies.replies.map((reply: any) => (
              <FeedReply key={reply.replyId} reply={reply} />
            ))}
          </Replies>
          <AddBox>
            <AddReply
              placeholder="댓글 달기..."
              value={isInput}
              onChange={handleChangeReply}
              onKeyUp={handleEnterReply}
            />
            <AddBtn onClick={() => postReply()}>게시</AddBtn>
          </AddBox>
        </RightDetail>
      </DetailContainer>
      {bigImage && <FeedImage url={imgUrl} handleFunc={handleBigImg} />}
    </ModalBackground>
  );
};

export default FeedDetail;
