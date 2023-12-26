import React, { useState, useEffect } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
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
// import { useGetUserFeed } from "../../hooks/UserInfoHook";
import { useRecoilValue } from "recoil";
import { memberIdAtom, tokenAtom } from "../../atoms";
import { MyInfoFormProps } from "../../types/memberType";
import { feedDataType } from "../../types/userInfoType";
import { getUserFeed } from "../../services/userInfoService";

const UserFeedForm: React.FC<MyInfoFormProps> = ({ pageMemberId }) => {
  const [tap, setTap] = useState<number>(0);
  const [feedData, setFeedData] = useState<feedDataType[] | undefined>(
    undefined,
  );
  const [endPoint, setEndPoint] = useState<string>("feed");
  const tapMenu = ["feed", "feed-like", "feed-bookmark"];
  // const { mutate: getFeedMutate } = useGetUserFeed(
  //   Number(pageMemberId),
  //   endPoint,
  //   setFeedData,
  // );

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
  const paramsId = useParams();
  const memberId = paramsId && paramsId.pageMemberId;

  const { data, isLoading, error } = useQuery({
    queryKey: ["userFeed", memberId, endPoint, 1],
    queryFn: () => getUserFeed(memberId, endPoint, 1),
  });

  if (error) {
    return <div>404.....</div>;
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
        {data?.data.data ? (
          data?.data.data.map(
            (feed: {
              likeCount: number;
              repliesCount: number;
              feedId: React.Key | null | undefined;
            }) => (
              <FeedCard
                likeCount={feed.likeCount}
                repliesCount={feed.repliesCount}
                key={feed.feedId}
              />
            ),
          )
        ) : (
          <p>등록된 피드가 없습니다.</p>
        )}
      </FeedContainer>
    </MyFeedContainer>
  );
};

export default UserFeedForm;
