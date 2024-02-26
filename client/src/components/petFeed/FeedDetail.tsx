import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import {
  alertAtom,
  isLoginAtom,
  memberIdAtom,
  replyAtom,
  reportAtom,
  tokenAtom,
} from "../../atoms";
import Heart from "../../atoms/button/Heart";
import Bookmark from "../../atoms/button/Bookmark";
import FeedReplies from "./FeedReplies";
import FeedImage from "./FeedImage";
import {
  useDeleteFeed,
  useFeedBookmark,
  useFeedLike,
  useGetFeed,
} from "../../hooks/FeedHook";
import { usePostReply } from "../../hooks/ReplyHook";
import {
  CloseModal,
  DetailBackground,
  DetailContainer,
  DetailContent,
  DetailContents,
  DetailHeader,
  DetailImage,
  DetailLeft,
  DetailMain,
  DetailMedia,
  DetailProfile,
  DetailRight,
  DetailStatus,
  DetailTime,
  DetailTitle,
  DetailUserName,
  DetailVideo,
  LikeBox,
  MediaBox,
  NextMedia,
  PrevMedia,
  ReplyCount,
  SelectBtn,
  SelectMedia,
  SendBox,
  SendBtn,
  SendContainer,
  SendInput,
  SendProfile,
  SettingIcon,
  Unknown,
} from "./FeedDetail.style";
import { UserImgForm } from "../../atoms/imgForm/ImgForm";
import { usePostComment } from "../../hooks/CommentHook";
import Setting from "../modal/setting/Setting";

interface OwnProps {
  feedId: number;
  handleFeedDetail: () => void;
}

const FeedDetail: React.FC<OwnProps> = ({ feedId, handleFeedDetail }) => {
  const navigate = useNavigate();
  const navigator = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);
  const accesstoken = useRecoilValue(tokenAtom);
  const setAlertModal = useSetRecoilState(alertAtom);

  const { data, isError, isLoading } = useGetFeed(feedId, accesstoken);
  const { mutate: feedLike } = useFeedLike(feedId, accesstoken);
  const { mutate: feedBookmark } = useFeedBookmark(feedId, accesstoken);

  const mediaRef = useRef<any>(null);
  const pageList = [];
  if (!isLoading) {
    for (let i = 1; i <= data.images?.length + (data.videos ? 1 : 0); i++) {
      pageList.push(i);
    }
  }
  const [isMedia, setMedia] = useState<number>(0);
  const handlePrevMedia = (): void => {
    if (isMedia > 0) {
      mediaRef.current.style.transform = `translateX(-${isMedia - 1}00%)`;
      setMedia((isMedia) => isMedia - 1);
    }
  };
  const handleNextMedia = (): void => {
    if (isMedia < data.images.length + (data.videos ? 0 : -1)) {
      mediaRef.current.style.transform = `translateX(-${isMedia + 1}00%)`;
      setMedia((isMedia) => isMedia + 1);
    }
  };
  const handleChangeMedia = (idx: number): void => {
    mediaRef.current.style.transform = `translateX(-${idx}00%)`;
    setMedia((isMedia) => idx);
  };

  const [isSetting, setSetting] = useState<boolean>(false);
  const handleSetting = (): void => setSetting(!isSetting);

  const [bigImage, setBigImage] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>("");
  const handleBigImg = (url = ""): void => {
    setBigImage(!bigImage);
    setImgUrl(url);
  };

  // 댓글 달기
  const [isInput, setInput] = useState("");
  const reply = useRecoilValue(replyAtom);
  const resetReply = useResetRecoilState(replyAtom);
  const handleChangeAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const { mutate: postReply } = usePostReply(
    feedId,
    isInput,
    accesstoken,
    () => {
      setInput("");
      setAlertModal("댓글 등록이 되었습니다.");
    },
    () => setAlertModal("댓글 등록에 실패했습니다."),
  );
  useEffect(() => {
    return resetReply();
  }, []);

  // 대댓글 등록 훅
  const { mutate: postComment } = usePostComment(
    reply.replyId,
    isInput,
    accesstoken,
    () => {
      setInput("");
      resetReply();
      setAlertModal("대댓글 등록이 되었습니다.");
    },
    () => setAlertModal("대댓글 등록에 실패했습니다."),
  );
  const handleEnterAnswer = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && isInput) {
      handleSendAnswer();
    }
    if (!e.currentTarget.value) {
      if (e.key === "Backspace") {
        resetReply();
      }
    }
  };
  const handleSendAnswer = () => {
    if (!isLogin) {
      return setAlertModal("로그인 후 이용해주세요.");
    }
    if (!reply.replyId) {
      postReply();
    } else {
      postComment();
    }
  };

  // 피드 수정
  const handleReplyPatch = () => {
    navigator(`/update/${feedId}`);
    return;
  };

  // 피드 단일 삭제
  const { mutate: deleteFeed } = useDeleteFeed(
    feedId,
    accesstoken,
    () => setAlertModal("피드가 삭제 되었습니다."),
    () => setAlertModal("피드 삭제에 실패했습니다."),
  );
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
          수정: handleReplyPatch,
          삭제: handleReplyDelete,
        }
      : {
          신고: handleReplyReport,
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

  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <>오류 발생</>;
  }
  return (
    <DetailBackground onClick={handleFeedDetail}>
      <DetailContainer onClick={(e) => e.stopPropagation()}>
        <CloseModal onClick={handleFeedDetail}>
          <span>&times;</span>
        </CloseModal>
        <DetailHeader>
          <DetailProfile>
            <DetailUserName
              onClick={() => navigate(`/user/${data.member.memberId}`)}
            >
              <span>{data.member?.nickname}</span>님의 게시글
            </DetailUserName>
            <DetailTime>{setTime(data.createdDate)}</DetailTime>
          </DetailProfile>
          <SettingIcon onClick={handleSetting} />
        </DetailHeader>
        <DetailMain>
          <DetailLeft>
            <DetailContents>
              <DetailTitle>{data.title}</DetailTitle>
              {data.content && (
                <DetailContent
                  dangerouslySetInnerHTML={{ __html: data.content }}
                />
              )}
            </DetailContents>
            {(data.images.length > 0 || data.videos) && (
              <DetailMedia>
                <MediaBox ref={mediaRef}>
                  {data.videos && (
                    <DetailVideo
                      src={data.videos}
                      controls={true}
                      muted={false}
                      disablePictureInPicture={true}
                    />
                  )}
                  {data.images?.map((imgUrl: string, idx: number) => (
                    <DetailImage
                      key={idx}
                      src={imgUrl}
                      alt="이미지"
                      onClick={() => handleBigImg(imgUrl)}
                    />
                  ))}
                </MediaBox>
                <PrevMedia className="button" onClick={handlePrevMedia} />
                <NextMedia className="button" onClick={handleNextMedia} />
                <SelectMedia>
                  {pageList.map((_, idx) => (
                    <SelectBtn
                      key={idx}
                      select={idx === isMedia}
                      onClick={() => handleChangeMedia(idx)}
                    />
                  ))}
                </SelectMedia>
              </DetailMedia>
            )}
            <DetailStatus>
              <LikeBox>
                <Heart
                  width="25px"
                  height="25px"
                  isLike={data.likeYn}
                  handleFunc={feedLike}
                />
                <span>{data.likeCount}</span>
              </LikeBox>
              <Bookmark
                width="25px"
                height="25px"
                isBookmark={data.bookmarkYn}
                handleFunc={feedBookmark}
              />
            </DetailStatus>
          </DetailLeft>

          <DetailRight>
            <ReplyCount>
              <span>댓글 {data.replies.pageInformation.totalSize}개</span>
            </ReplyCount>
            <FeedReplies feedId={feedId} feedOwnerId={data.member.memberId} />
            <SendContainer>
              <SendProfile>
                {data.member.imageUrl ? (
                  <UserImgForm
                    width={40}
                    height={40}
                    radius={50}
                    URL={data.member.imageUrl}
                  />
                ) : (
                  <Unknown />
                )}
              </SendProfile>
              <SendBox>
                {reply.nickname && <span>{`@${reply.nickname} |`}</span>}
                <SendInput
                  value={isInput}
                  onChange={handleChangeAnswer}
                  onKeyUp={handleEnterAnswer}
                />
                <SendBtn onClick={handleSendAnswer}>등록</SendBtn>
              </SendBox>
            </SendContainer>
          </DetailRight>
        </DetailMain>
        {isSetting && (
          <Setting
            elements={settingContent}
            handleSetting={handleSetting}
            width="300px"
            height="80px"
            font="20px"
            icon="20px"
          />
        )}
      </DetailContainer>
      {bigImage && <FeedImage url={imgUrl} handleFunc={handleBigImg} />}
    </DetailBackground>
  );
};

export default FeedDetail;
