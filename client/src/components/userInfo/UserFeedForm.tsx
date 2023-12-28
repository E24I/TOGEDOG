import React, { useEffect, useState } from "react";
import {
  MyFeedContainer,
  TapContainer,
  TapMenuOff,
  TapMenuOn,
  MyFeeds,
  Hearts,
  BookMarks,
  FeedContainer,
} from "./UserFeedForm.style";
import FeedCard from "./feedCardComponent/FeedCard";
import { MyInfoFormProps } from "../../types/memberType";
import { useGetUserFeeds } from "../../hooks/UserInfoHook";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

const UserFeedForm: React.FC<MyInfoFormProps> = ({ pageMemberId }) => {
  const [tap, setTap] = useState<number>(0);
  const [endPoint, setEndPoint] = useState<string>("feed");
  const tapMenu = ["feed", "feed-like", "feed-bookmark"];

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
        {tapMenu.map((menu: string, idx: number) =>
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
        {feedsData ? (
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
          <p>등록된 피드가 없습니다.</p>
        )}
        <div ref={setTarget} />
      </FeedContainer>
    </MyFeedContainer>
  );
};

export default UserFeedForm;
