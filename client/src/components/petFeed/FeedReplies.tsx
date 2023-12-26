import React from "react";
import { useInfiniteGetReplies } from "../../hooks/ReplyHook";
import { Replies } from "./Feed.Style";
import FeedReply from "./FeedReply";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

interface OwnProps {
  feedId: number;
}

const FeedReplies: React.FC<OwnProps> = ({ feedId }) => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteGetReplies(feedId);
  const repliesData = data?.pages.flat();

  console.log(repliesData);

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
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
      <div ref={setTarget} />
    </Replies>
  );
};
export default FeedReplies;
