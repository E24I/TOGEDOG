import React from "react";
import {
  CardForm,
  ContentBox,
  LikeBox,
  BookMarkBox,
  Heart,
  BookMark,
} from "./FeedCard.style";
type FeedCardProps = {
  likeCount: number;
  repliesCount: number;
};
// 필요한 데이터 = 이미지url, 좋아요 수, 댓글 수

const FeedCard: React.FC<FeedCardProps> = ({ likeCount, repliesCount }) => {
  return (
    <CardForm thumbnail={""}>
      <div className="cardHover">
        <ContentBox>
          <LikeBox>
            <Heart />
            <p>{likeCount}</p>
          </LikeBox>
          <BookMarkBox>
            <BookMark />
            <p>{repliesCount}</p>
          </BookMarkBox>
        </ContentBox>
      </div>
    </CardForm>
  );
};

export default FeedCard;
