import React, { useState } from "react";
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

const UserFeedForm = () => {
  const [tap, setTap] = useState<number>(0);
  const tapMenu = ["게시글", "좋아요", "북마크"];

  const handleTap = (index: number) => {
    setTap(index);
  };

  const tapImg = (menu: string) => {
    switch (menu) {
      case "게시글":
        return <MyFeeds />;
      case "좋아요":
        return <Hearts />;
      case "북마크":
        return <BookMarks />;
    }
  };

  return (
    <MyFeedContainer>
      <TapContainer>
        {tapMenu.map((menu: string, idx: number) =>
          tap === idx ? (
            <TapMenuOn key={idx}>
              <button onClick={() => handleTap(idx)}>
                {tapImg(menu)}
                <p>{menu}</p>
              </button>
            </TapMenuOn>
          ) : (
            <TapMenuOff key={idx}>
              <button onClick={() => handleTap(idx)}>
                {tapImg(menu)}
                <p>{menu}</p>
              </button>
            </TapMenuOff>
          ),
        )}
      </TapContainer>
      <FeedContainer>
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
        <FeedCard />
      </FeedContainer>
    </MyFeedContainer>
  );
};

export default UserFeedForm;
