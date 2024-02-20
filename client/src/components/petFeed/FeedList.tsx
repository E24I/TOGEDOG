import React, { createRef, useEffect, useRef, useState } from "react";
import { feedListsType } from "../../types/feedDataType";
import FeedDetail from "./FeedDetail";
import {
  Feed,
  FeedHeader,
  Profile,
  ProfileBox,
  Unknown,
  UserName,
  UploadTime,
  FeedContents,
  FeedTitle,
  FeedContent,
  FeedMedia,
  FeedImgs,
  FeedImg,
  LeftScroll,
  RightScroll,
  FeedStatus,
  LikeBox,
  ReviewCount,
  SettingIcon,
  SettingBox,
  FeedVideo,
  Message,
  ProfileInfo,
  PinPoint,
  LeftStatus,
  RightStatus,
  ScrollTop,
  UpBtn,
} from "./Feed.Style";
import Heart from "../../atoms/button/Heart";
import Bookmark from "../../atoms/button/Bookmark";
import Dropdown from "../../atoms/dropdown/Dropdowns";
import {
  useDeleteFeed,
  useFeedBookmark,
  useFeedLike,
} from "../../hooks/FeedHook";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  alertAtom,
  isLoginAtom,
  memberIdAtom,
  reportAtom,
  tokenAtom,
} from "../../atoms";
import { useNavigate } from "react-router-dom";
import { UserImgForm } from "../../atoms/imgForm/ImgForm";
import Setting from "../modal/setting/Setting";

interface OwnProps {
  items: feedListsType;
}

const FeedList: React.FC<OwnProps> = ({ items }) => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);
  const accesstoken = useRecoilValue(tokenAtom);
  const setAlertModal = useSetRecoilState(alertAtom);

  const [isDetail, setDetail] = useState<boolean>(false);
  const [isSetting, setSetting] = useState<boolean>(false);
  const { mutate: feedLike } = useFeedLike(items.feedId, accesstoken);
  const { mutate: feedBookmark } = useFeedBookmark(items.feedId, accesstoken);
  const handleMoreReview = (): void => setDetail(!isDetail);
  const handleSetting = (): void => setSetting(!isSetting);
  const handleCloseDropdown = () => setSetting(false);

  const mediaBoxRef = useRef<any>(null);
  const mediaItems = items.videos
    ? [items.videos].concat(items.images)
    : items.images;
  const mediaRef = useRef<any>(mediaItems?.map(() => createRef()));
  const [isMedia, setMedia] = useState<number>(0);

  const navigator = useNavigate();

  // 미디어 왼쪽 스크롤 이동 버튼
  const handleScrollLeft = () => {
    if (isMedia > 0 && mediaRef.current[isMedia]) {
      mediaBoxRef.current.scrollLeft =
        mediaBoxRef.current.scrollLeft -
        mediaRef.current[isMedia].current.offsetWidth -
        20;
      setMedia(isMedia - 1);
    }
  };

  // 미디어 오른쪽 스크롤 이동 버튼
  const handleScrollRight = () => {
    if (isMedia >= 0 && mediaRef.current[isMedia + 1]) {
      mediaBoxRef.current.scrollLeft =
        mediaBoxRef.current.scrollLeft +
        mediaRef.current[isMedia].current.offsetWidth +
        20;
      setMedia(isMedia + 1);
    }
  };

  // 피드 단일 삭제
  const { mutate: deleteFeed } = useDeleteFeed(items.feedId, accesstoken);
  const handleReplyDelete = () => {
    return deleteFeed();
  };

  // 피드 신고
  const [reportModal, setReportModal] = useRecoilState(reportAtom);
  const handleReplyReport = () => {
    if (!isLogin) {
      return setAlertModal("로그인 후 이용해주세요.");
    }
    setReportModal({ ...reportModal, sort: "feed", feedId: items.feedId });
  };

  // 피드 수정 (핸들러)
  const handleReplyPatch = () => {
    navigator(`/update/${items.feedId}`);
  };

  // 설정 드롭다운 버튼 종류 및 핸들러 연결
  const myId = useRecoilValue(memberIdAtom);
  const settingContent =
    items.member?.memberId === myId
      ? {
          수정: handleReplyPatch,
          삭제: handleReplyDelete,
        }
      : {
          신고: handleReplyReport,
        };

  // 스크롤 방지(모달창 켜져있을때)
  useEffect(() => {
    if (isDetail) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isDetail]);

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

  const [width, setWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // 맨 위로 스크롤
  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <Feed>
      <FeedHeader>
        <Profile
          onClick={() => {
            navigate(`/user/${items.member.memberId}`);
          }}
        >
          {items.member.imageUrl ? (
            <UserImgForm
              width={50}
              height={50}
              radius={50}
              URL={items.member.imageUrl}
            />
          ) : (
            <Unknown />
          )}

          <ProfileInfo>
            <UserName>{items.member.nickname}</UserName>
            <UploadTime>{setTime(items.createdDate)}</UploadTime>
          </ProfileInfo>
        </Profile>

        <SettingBox onClick={handleSetting} onBlur={() => setSetting(false)}>
          <SettingIcon />
        </SettingBox>
      </FeedHeader>

      <FeedContents>
        <FeedTitle>
          {items.title}
          {items.wgs84_y && items.wgs84_x && <PinPoint />}
        </FeedTitle>
        {items.content && (
          <FeedContent dangerouslySetInnerHTML={{ __html: items.content }} />
        )}
      </FeedContents>

      {(items.images.length > 0 || items.videos) && (
        <FeedMedia>
          {/* <LeftScroll onClick={() => handleScrollLeft()} /> */}
          <FeedImgs ref={mediaBoxRef}>
            {items.videos && (
              <FeedVideo
                ref={mediaRef.current[0]}
                src={items.videos}
                controls={true}
                muted={false}
              />
            )}
            {items.images.length > 0 &&
              items.images.map((el, idx) => (
                <FeedImg
                  key={idx}
                  ref={mediaRef.current[items.videos ? idx + 1 : idx]}
                  src={el}
                  alt={`피드 이미지${items.videos ? idx + 1 : idx}`}
                  onClick={handleMoreReview}
                />
              ))}
          </FeedImgs>
          {/* <RightScroll onClick={() => handleScrollRight()} />  */}
        </FeedMedia>
      )}

      <FeedStatus>
        <LeftStatus>
          <LikeBox>
            <Heart
              width="25px"
              height="25px"
              isLike={items.likeYn}
              handleFunc={feedLike}
            />
            <span>{items.likeCount}</span>
          </LikeBox>
          <ReviewCount>
            <Message onClick={handleMoreReview} />
            <span>{items.repliesCount}</span>
          </ReviewCount>
        </LeftStatus>
        <RightStatus>
          <Bookmark
            width="25px"
            height="25px"
            isBookmark={items.bookmarkYn}
            handleFunc={feedBookmark}
          />
        </RightStatus>
      </FeedStatus>
      {isDetail && (
        <FeedDetail feedId={items.feedId} handleMoreReview={handleMoreReview} />
      )}
      {window.scrollY && width <= 375 ? (
        <ScrollTop onClick={handleScrollTop}>맨 위로</ScrollTop>
      ) : (
        <UpBtn onClick={handleScrollTop} />
      )}
      {isSetting && <Setting elements={settingContent} />}
    </Feed>
  );
};

export default FeedList;
