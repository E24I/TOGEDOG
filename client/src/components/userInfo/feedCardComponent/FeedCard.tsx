import React, { useState } from "react";
import {
  CardForm,
  ContentBox,
  LikeBox,
  BookMarkBox,
  Heart,
  BookMark,
} from "./FeedCard.style";
import FeedDetail from "../../petFeed/FeedDetail";
type FeedCardProps = {
  likeCount: number;
  repliesCount: number;
  feedId: number;
  image?: string;
};
// 필요한 데이터 = 이미지url, 좋아요 수, 댓글 수

const FeedCard: React.FC<FeedCardProps> = ({
  likeCount,
  repliesCount,
  feedId,
  image,
}) => {
  const [isDetail, setDetail] = useState<boolean>(false);
  const handleMoreReview = (): void => setDetail(!isDetail);
  return (
    <CardForm
      thumbnail={image?.length ? image[0] : ""}
      onClick={() => setDetail(true)}
    >
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
      {isDetail && (
        <FeedDetail feedId={feedId} handleMoreReview={handleMoreReview} />
      )}
    </CardForm>
  );
};

export default FeedCard;
