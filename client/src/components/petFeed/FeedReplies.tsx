import React, { useState } from "react";
import { useInfiniteGetReplies } from "../../hooks/ReplyHook";
import { Replies } from "./Feed.Style";
import FeedReply from "./FeedReply";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

interface OwnProps {
  feedId: number;
}

const FeedReplies: React.FC<OwnProps> = ({ feedId }) => {
  const [moreReplies, setMoreReplies] = useState(false);
  const callbackFn = () => setMoreReplies(false);
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteGetReplies(feedId);
  const repliesData = data?.pages.flat();

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
    callbackFn,
  });

  if (isLoading) {
    return <>로딩중</>;
  }
  if (isError) {
    return <>오류 발생</>;
  }
  return (
    <Replies>
      {repliesData?.map((reply: any) => (
        <FeedReply key={reply.replyId} reply={reply} />
      ))}
      {moreReplies && <div ref={setTarget}></div>}
      {repliesData && repliesData.length > 0 && hasNextPage && (
        <button onClick={() => setMoreReplies(true)}>댓글 더보기</button>
      )}
    </Replies>
  );
};
export default FeedReplies;
