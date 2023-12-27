import React from "react";
import {
  CardForm,
  ContentBox,
  LikeBox,
  BookMarkBox,
  Heart,
  BookMark,
} from "./FeedCard.style";

// 필요한 데이터 = 이미지url, 좋아요 수, 댓글 수

const FeedCard = () => {
  return (
    <CardForm thumbnail={""}>
      <div className="cardHover">
        <ContentBox>
          <LikeBox>
            <Heart />
            <p>11</p>
          </LikeBox>
          <BookMarkBox>
            <BookMark />
            <p>11</p>
          </BookMarkBox>
        </ContentBox>
      </div>
    </CardForm>
  );
};

export default FeedCard;
