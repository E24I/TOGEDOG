import React, { useEffect, useRef, useState } from "react";
import { feedListsType } from "../../types/feedDataType";
import FeedDetail from "./FeedDetail";
import {
  Feed,
  FeedHeader,
  Profile,
  Unknown,
  UserName,
  UploadTime,
  FeedContents,
  FeedTitle,
  FeedContent,
  MediaSection,
  FeedMedia,
  FeedImg,
  FeedStatus,
  LikeBox,
  ReviewCount,
  SettingIcon,
  FeedVideo,
  Message,
  ProfileInfo,
  PinPoint,
  LeftStatus,
  RightStatus,
  ScrollTop,
  UpBtn,
  MediaBox,
  LeftBar,
  RightBar,
  MediaBar,
  ContentBox,
  MoreBtn,
  SettingBox,
} from "./Feed.Style";
import Heart from "../../atoms/button/Heart";
import Bookmark from "../../atoms/button/Bookmark";
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
import Setting from "../../atoms/modal/setting/Setting";

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

  // content ref 설정 (더보기)
  const contentRef = useRef<any>(null);

  // Media ref 설정 (스크롤)
  const mediaBoxRef = useRef<any>(null);
  const mediaRef = useRef<any>(null);
  const [isMedia, setMedia] = useState<number>(0);

  // 미디어 왼쪽 스크롤 이동 버튼
  const handleScrollLeft = () => {
    if (isMedia > 0) {
      mediaBoxRef.current.scrollLeft =
        mediaBoxRef.current.scrollLeft - 390 - 20;
      setMedia(isMedia - 1);
    }
  };

  // 미디어 오른쪽 스크롤 이동 버튼
  const handleScrollRight = () => {
    if (
      isMedia >= 0 &&
      isMedia < (items.videos ? 1 : 0) + items.images.length
    ) {
      mediaBoxRef.current.scrollLeft =
        mediaBoxRef.current.scrollLeft + 309 + 20;
      setMedia(isMedia + 1);
    }
  };

  // 피드 단일 삭제
  const { mutate: deleteFeed } = useDeleteFeed(
    items.feedId,
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
    setReportModal({ ...reportModal, sort: "feed", feedId: items.feedId });
  };

  // 피드 수정 (핸들러)
  const handleReplyPatch = () => {
    navigate(`/update/${items.feedId}`);
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

  const [height, setHeight] = useState(window.scrollY);
  const handleScrollY = () => {
    setHeight(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScrollY);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScrollY);
    };
  }, []);

  // 맨 위로 스크롤
  const handleScrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const [content, setContent] = useState<boolean>(false);

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

        <SettingBox onClick={handleSetting} onBlur={handleSetting}>
          <SettingIcon />
        </SettingBox>
      </FeedHeader>

      <FeedContents>
        <FeedTitle>
          {items.title}
          {items.wgs84_y && items.wgs84_x && <PinPoint />}
        </FeedTitle>
        {items.content && (
          <ContentBox>
            <FeedContent
              ref={contentRef}
              dangerouslySetInnerHTML={{ __html: items.content }}
            />
            {contentRef.current?.clientHeight > 41 && !content && (
              <MoreBtn
                onClick={() => {
                  contentRef.current?.classList.add("show");
                  setContent(true);
                }}
              >
                ...더보기
              </MoreBtn>
            )}
          </ContentBox>
        )}
      </FeedContents>

      {(items.images.length > 0 || items.videos) && (
        <MediaSection>
          <MediaBar>
            <MediaBox ref={mediaBoxRef}>
              <FeedMedia ref={mediaRef}>
                {items.videos && (
                  <FeedVideo
                    src={items.videos}
                    disablePictureInPicture={true}
                  />
                )}
                {items.images.length > 0 &&
                  items.images.map((el, idx) => (
                    <FeedImg
                      key={idx}
                      src={el}
                      alt={`피드 이미지${items.videos ? idx + 1 : idx}`}
                    />
                  ))}
              </FeedMedia>
            </MediaBox>
            {mediaBoxRef.current?.clientWidth <
              mediaRef.current?.clientWidth && (
              <>
                <RightBar onClick={handleScrollRight} />
                <LeftBar onClick={handleScrollLeft} />
              </>
            )}
          </MediaBar>
        </MediaSection>
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
        <FeedDetail feedId={items.feedId} handleFeedDetail={handleMoreReview} />
      )}
      {isSetting && (
        <Setting
          elements={settingContent}
          width="300px"
          height="85px"
          font="20px"
          icon="20px"
        />
      )}
      {height >= 500 &&
        (width <= 1024 ? (
          <ScrollTop onClick={handleScrollTop}>맨 위로</ScrollTop>
        ) : (
          <UpBtn onClick={handleScrollTop} />
        ))}
    </Feed>
  );
};

export default FeedList;
