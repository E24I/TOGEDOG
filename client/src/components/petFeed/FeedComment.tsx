import React, { useState } from "react";
import { useInfiniteGetComments } from "../../hooks/CommentHook";
import { feedCommentType } from "../../types/feedDataType";
import CommentItem from "./CommentItems";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { Comments } from "./FeedComment.style";
import { MoreReply } from "./FeedReply.style";

interface OwnProps {
  replyId: number;
}

const FeedComment: React.FC<OwnProps> = ({ replyId }) => {
  const [moreComments, setMoreComments] = useState(false);
  const callbackFn = () => setMoreComments(false);
  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteGetComments(replyId);
  const commentsData = data?.pages.flat();
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
    <Comments>
      {commentsData?.map((comment: feedCommentType) => (
        <CommentItem key={comment.commentId} comment={comment} />
      ))}
      {moreComments && <div ref={setTarget} />}
      {commentsData && commentsData.length > 0 && hasNextPage && (
        <MoreReply onClick={() => setMoreComments(true)}>답글 더보기</MoreReply>
      )}
    </Comments>
  );
};

export default FeedComment;
