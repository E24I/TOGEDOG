import React, { useState } from "react";
import FeedComment from "./FeedComment";
import {
  Comments,
  FeedReviewTop,
  Replies,
  Reply,
  ReplyContent,
  ReplyContents,
  ReplyDate,
  ReplyLeft,
  ReplyLikeCount,
  ReplyNickname,
  ReplySetting,
  ReviewCount,
  Setting,
  ShowComment,
  Unknown,
} from "./Feed.Style";
import Heart from "../../atoms/button/Heart";

const FeedReply: React.FC = () => {
  const [isLike, setLike] = useState<boolean>(false);
  const handleLike = (): void => setLike(!isLike);

  return (
    <Replies>
      <FeedReviewTop>
        <ReviewCount>댓글 3개</ReviewCount>
      </FeedReviewTop>
      <Reply>
        <ReplyLeft>
          {/* <ReplyProfile /> */}
          <Unknown />
        </ReplyLeft>
        <ReplyContents>
          <ReplyNickname>세계최강 귀요미 몽자</ReplyNickname>
          <ReplyContent>
            마루언니님 안녕하세요 저는 3살된 몽자언니입니다. 저히 몽자는 그
            맘때쯤에 삑삑이 소리나는 공을 제일 조아했어요
          </ReplyContent>
          <ReplySetting>
            <ReplyDate>20분 전</ReplyDate>
            <Heart
              width="18px"
              height="18px"
              isLike={isLike}
              handleCustomEvent={handleLike}
            />
            <ReplyLikeCount>1</ReplyLikeCount>
            <Setting />
          </ReplySetting>
          <ShowComment>└ 답글 보기(1)</ShowComment>
          <Comments>
            <FeedComment />
          </Comments>
        </ReplyContents>
      </Reply>
    </Replies>
  );
};

export default FeedReply;
