import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import FeedReply from "./FeedReply";
import { tokenAtom } from "../../atoms";
import { Replies } from "./FeedReply.style";
import { useInfiniteGetReplies } from "../../hooks/ReplyHook";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

interface OwnProps {
  feedId: number;
  feedOwnerId: number;
}

const FeedReplies: React.FC<OwnProps> = ({ feedId, feedOwnerId }) => {
  const accesstoken = useRecoilValue(tokenAtom);
  const [moreReplies, setMoreReplies] = useState(false);
  const callbackFn = () => setMoreReplies(false);
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteGetReplies(feedId, accesstoken);
  const repliesData = data?.pages.flat();

  const { setTarget } = useIntersectionObserver({
    hasNextPage,
    fetchNextPage,
    callbackFn,
  });

  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <>오류 발생</>;
  }
  return (
    <Replies>
      {repliesData?.map((reply: any) => (
        <FeedReply
          key={reply.replyId}
          reply={reply}
          feedOwnerId={feedOwnerId}
        />
      ))}
      {moreReplies && <div ref={setTarget}></div>}
      {repliesData && repliesData.length > 0 && hasNextPage && (
        <button onClick={() => setMoreReplies(true)}>댓글 더보기</button>
      )}
    </Replies>
  );
};
export default FeedReplies;
