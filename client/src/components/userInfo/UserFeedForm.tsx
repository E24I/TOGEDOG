import React, { useState, useEffect } from "react";
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
import { useGetUserFeed } from "../../hooks/UserInfoHook";
import { useRecoilValue } from "recoil";
import { memberIdAtom } from "../../atoms";

type feedDataType = {
  content: string;
  createdDate: string;
  feedId: number;
  images: string[];
  likeCount: number;
  repliesCount: number;
  updatedDate: string;
  title: string;
  videos: string;
  views: null | number;
};
type data = feedDataType[];

const UserFeedForm = () => {
  const [tap, setTap] = useState<number>(0);
  const [feedData, setFeedData] = useState<feedDataType[] | undefined>(
    undefined,
  );
  const [endPoint, setEndPoint] = useState<string>("feed");
  const tapMenu = ["feed", "feed-like", "feed-bookmark"];

  const memberId = useRecoilValue(memberIdAtom);
  const { mutate: getFeedMutate } = useGetUserFeed(
    Number(memberId),
    endPoint,
    setFeedData,
  );

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
    getFeedMutate();
    console.log(feedData);
  }, [endPoint]);

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
                  {" "}
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
        {feedData &&
          feedData.map((data) => (
            <FeedCard
              likeCount={data.likeCount}
              repliesCount={data.repliesCount}
              key={data.feedId}
            />
          ))}
      </FeedContainer>
    </MyFeedContainer>
  );
};

export default UserFeedForm;
