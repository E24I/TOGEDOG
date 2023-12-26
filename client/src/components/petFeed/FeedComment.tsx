import React, { useState } from "react";
import { AddBox, AddBtn, AddReply, Comments } from "./Feed.Style";
import {
  useInfiniteGetComments,
  usePostComment,
} from "../../hooks/CommentHook";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../atoms";
import { feedCommentType } from "../../types/feedDataType";
import CommentItem from "./CommentItems";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";

interface OwnProps {
  replyId: number;
}

const FeedComment: React.FC<OwnProps> = ({ replyId }) => {
  const accesstoken = useRecoilValue(tokenAtom);
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

  // 대댓글 입력 핸들러
  const [isInput, setInput] = useState(""); // 대댓글 입력창 value
  const handleWriteComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // 대댓글 등록 훅
  const { mutate: postComment } = usePostComment(
    replyId,
    isInput,
    accesstoken,
    () => setInput(""),
  );

  // 대댓글 등록 핸들러
  const handlePostComment = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") postComment();
  };

  if (isLoading) {
    return <>로딩중</>;
  }
  if (isError) {
    return <>오류 발생</>;
  }
  return (
    <Comments>
      <AddBox>
        <AddReply
          placeholder="답글 달기..."
          value={isInput}
          onChange={handleWriteComment}
          onKeyUp={handlePostComment}
        />
        <AddBtn>게시</AddBtn>
      </AddBox>
      {commentsData?.map((comment: feedCommentType) => (
        <CommentItem key={comment.commentId} comment={comment} />
      ))}
      {moreComments && <div ref={setTarget} />}
      {hasNextPage && (
        <button onClick={() => setMoreComments(true)}>답글 더보기</button>
      )}
    </Comments>
  );
};

export default FeedComment;
