import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { memberIdAtom } from "../../atoms";
import {
  MyFeedContainer,
  TapContainer,
  TapMenuOff,
  TapMenuOn,
  MyFeeds,
  Hearts,
  BookMarks,
  FeedContainer,
  NoneFeedBox,
  LogoImg,
} from "./UserFeedForm.style";
import FeedCard from "./feedCardComponent/FeedCard";
import { MyInfoFormProps } from "../../types/memberType";
import { useGetUserFeeds } from "../../hooks/UserInfoHook";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const UserFeedForm: React.FC<MyInfoFormProps> = ({ pageMemberId }) => {
  const tapMenu = ["feed", "feed-like", "feed-bookmark"];
  const [tapList, setTapList] = useState<string[]>(tapMenu);
  const [tap, setTap] = useState<number>(0);
  const [endPoint, setEndPoint] = useState<string>("feed");
  const memberId = useRecoilValue(memberIdAtom);
  const handleTap = (index: number, menu: string) => {
    setTap(index);
    setEndPoint(menu);
  };
  const tapImg = (menu: string) => {
    switch (menu) {
      case "feed":
        return <MyFeeds />;
      case "feed-like":
        return <Hearts />;
      case "feed-bookmark":
        return <BookMarks />;
    }
  };
  useEffect(() => {
    if (Number(pageMemberId) !== memberId) {
      setTapList(["feed"]);
    }
  }, [pageMemberId]);
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useGetUserFeeds(pageMemberId, endPoint);
  const feedsData = data?.pages.flat();

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
  });
  if (isError) {
    return <div>페이지 불러 오기 실패</div>;
  }
  if (isLoading) {
    <div>Loading...</div>;
  }
  return (
    <MyFeedContainer>
      <TapContainer>
        {tapList.map((menu: string, idx: number) =>
          tap === idx ? (
            <TapMenuOn key={idx}>
              <button onClick={() => handleTap(idx, menu)}>
                {tapImg(menu)}
                <p>
                  {menu === "feed"
                    ? "게시물"
                    : menu === "feed-like"
                    ? "좋아요"
                    : "북마크"}
                </p>
              </button>
            </TapMenuOn>
          ) : (
            <TapMenuOff key={idx}>
              <button onClick={() => handleTap(idx, menu)}>
                {tapImg(menu)}
                <p>
                  {menu === "feed"
                    ? "게시물"
                    : menu === "feed-like"
                    ? "좋아요"
                    : "북마크"}
                </p>
              </button>
            </TapMenuOff>
          ),
        )}
      </TapContainer>
      <FeedContainer>
        {feedsData?.length ? (
          feedsData?.map((feed) => (
            <FeedCard
              image={feed.images}
              likeCount={feed.likeCount}
              repliesCount={feed.repliesCount}
              key={feed.feedId}
              feedId={feed.feedId}
            />
          ))
        ) : (
          <NoneFeedBox>
            <LogoImg />
            <p>등록된 피드가 없습니다.</p>
          </NoneFeedBox>
        )}
        <div ref={setTarget} />
      </FeedContainer>
    </MyFeedContainer>
  );
};

export default UserFeedForm;
