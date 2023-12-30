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
import {
  useDeleteFeed,
  useFeedBookmark,
  useFeedLike,
  useGetFeed,
} from "../../hooks/FeedHook";
import { useRecoilState, useRecoilValue } from "recoil";
import { memberIdAtom, reportAtom, tokenAtom } from "../../atoms";
import { usePostReply } from "../../hooks/ReplyHook";
import FeedReplies from "./FeedReplies";

interface OwnProps {
  feedId: number;
  handleMoreReview(): void;
}

const FeedDetail: React.FC<OwnProps> = ({ feedId, handleMoreReview }) => {
  const accesstoken = useRecoilValue(tokenAtom);
  const { data, error, isLoading } = useGetFeed(feedId, accesstoken);
  const { mutate: feedLike } = useFeedLike(feedId, accesstoken);
  const { mutate: feedBookmark } = useFeedBookmark(feedId, accesstoken);

  const [isImg, setImg] = useState<number>(0);
  const handlePrevImg = (): void => {
    if (isImg !== 0) {
      setImg(isImg - 1);
    }
  };
  const handleNextImg = (): void => {
    if (isImg !== data.images.length) {
      setImg(isImg + 1);
    }
  };

  const [isSetting, setSetting] = useState<boolean>(false);
  const handleOpenDropdown = () => setSetting(!isSetting);
  const handleCloseDropdown = () => setSetting(false);
  const handleBigImg = (url = ""): void => {
    setBigImage(!bigImage);
    setImgUrl(url);
  };
  const [bigImage, setBigImage] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");

  // 댓글 달기
  const [isInput, setInput] = useState("");
  const handleChangeReply = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const { mutate: postReply } = usePostReply(feedId, isInput, accesstoken, () =>
    setInput(""),
  );
  const handleEnterReply = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") postReply();
  };

  // 피드 수정
  const handleReplyPatch = () => {
    return;
  };

  // 피드 단일 삭제
  const { mutate: deleteFeed } = useDeleteFeed(feedId, accesstoken);
  const handleReplyDelete = () => {
    return deleteFeed();
  };

  // 피드 신고
  const [reportModal, setReportModal] = useRecoilState(reportAtom);
  const handleReplyReport = () =>
    setReportModal({ ...reportModal, sort: "feed", feedId: feedId });

  // 설정 드롭다운 버튼 종류 및 핸들러 연결
  const myId = useRecoilValue(memberIdAtom);
  const settingContent =
    data?.member.memberId === myId
      ? {
          수정하기: handleReplyPatch,
          삭제하기: handleReplyDelete,
        }
      : {
          신고하기: handleReplyReport,
        };

  const today = new Date();
  const createDate = data?.createdDate.split("T")[0];
  const feedDate = createDate?.split("-").map((el: string) => parseInt(el));
  const createTime = data?.createdDate.split("T")[1];
  const feedTime = createTime?.split(":").map((el: string) => parseInt(el));

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
          {(data.images.length > 0 || data.videos) && (
            <FeedDetailMedia>
              <LeftScroll onClick={handlePrevImg} />
              <FeedDetailImgs>
                {data.videos && isImg === 0 && (
                  <FeedDetailVideo src={data.videos} />
                )}
                {data.images.length > 0 &&
                  data.images.map((el: string, idx: number) => {
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
          <FeedReplies feedId={feedId} />
          {/* <Replies>
            {data.replies.replies.map((reply: any) => (
              <FeedReply key={reply.replyId} reply={reply} />
            ))}
          </Replies> */}
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
