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
  ReviewCount,
  RightDetail,
  RightScroll,
  Setting,
  SettingBox,
  Unknown,
  UploadTime,
  UserName,
} from "./Feed.Style";
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
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  alertAtom,
  isLoginAtom,
  memberIdAtom,
  reportAtom,
  tokenAtom,
} from "../../atoms";
import { usePostReply } from "../../hooks/ReplyHook";
import FeedReplies from "./FeedReplies";
import { UserImgForm } from "../../atoms/imgForm/ImgForm";
import { useNavigate } from "react-router-dom";

interface OwnProps {
  feedId: number;
  handleMoreReview(): void;
}

const FeedDetail: React.FC<OwnProps> = ({ feedId, handleMoreReview }) => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);
  const accesstoken = useRecoilValue(tokenAtom);
  const setAlertModal = useSetRecoilState(alertAtom);

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
    const noneVideo = data.videos ? 1 : 0;
    if (isImg !== data.images.length + noneVideo - 1) {
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
    if (e.key === "Enter") {
      if (!isLogin) {
        return setAlertModal("로그인 후 이용해주세요.");
      }
      postReply();
    }
  };
  const handleSendReply = () => {
    if (!isLogin) {
      return setAlertModal("로그인 후 이용해주세요.");
    }
    postReply();
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
  const handleReplyReport = () => {
    if (!isLogin) {
      return setAlertModal("로그인 후 이용해주세요.");
    }
    setReportModal({ ...reportModal, sort: "feed", feedId: feedId });
  };

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

  // 피드 시간 경과 계산
  const setTime = (createdAt: string) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDiff = Math.floor(
      (currentDate.getTime() - createdDate.getTime()) / 1000,
    );
    const intervals = {
      년: 31536000,
      개월: 2592000,
      일: 86400,
      시간: 3600,
      분: 60,
      초: 1,
    };
    for (const [unit, seconds] of Object.entries(intervals)) {
      const diff = Math.floor(timeDiff / seconds);
      if (diff >= 1) {
        return `${diff}${unit} 전`;
      }
    }
    return "1초 전";
  };

  console.log(isImg);

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
              {data.member.imageUrl ? (
                <UserImgForm
                  width={50}
                  height={50}
                  radius={50}
                  URL={data.member.imageUrl}
                  onClick={() => {
                    navigate(`/user/${data.member.memberId}`);
                  }}
                />
              ) : (
                <ProfileBox>
                  <Unknown />
                </ProfileBox>
              )}
              <UserName>{data.member?.nickname}</UserName>
            </Profile>
            <UploadTime>{setTime(data.createdDate)}</UploadTime>
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
            <FeedContent dangerouslySetInnerHTML={{ __html: data.content }} />
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
                    const noneVideo = data.videos
                      ? isImg === idx + 1
                      : isImg === idx;
                    if (noneVideo) {
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
                    setImg(el - 1);
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
          <FeedReplies feedId={feedId} feedOwnerId={data.member.memberId} />
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
            <AddBtn onClick={handleSendReply}>게시</AddBtn>
          </AddBox>
        </RightDetail>
      </DetailContainer>
      {bigImage && <FeedImage url={imgUrl} handleFunc={handleBigImg} />}
    </ModalBackground>
  );
};

export default FeedDetail;
