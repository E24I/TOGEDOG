import React, { useState } from "react";
import {
  useInfiniteGetComments,
  usePostComment,
} from "../../hooks/CommentHook";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { alertAtom, isLoginAtom, tokenAtom } from "../../atoms";
import { feedCommentType } from "../../types/feedDataType";
import CommentItem from "./CommentItems";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { Comments } from "./FeedComment.style";

interface OwnProps {
  replyId: number;
}

const FeedComment: React.FC<OwnProps> = ({ replyId }) => {
  const isLogin = useRecoilValue(isLoginAtom);
  const accesstoken = useRecoilValue(tokenAtom);
  const setAlertModal = useSetRecoilState(alertAtom);

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
    if (e.key === "Enter") {
      handleSendComment();
    }
  };
  const handleSendComment = () => {
    if (!isLogin) {
      return setAlertModal("로그인 후 이용해주세요.");
    }
    postComment();
  };

  if (isLoading) {
    return <></>;
  }
  if (isError) {
    return <>오류 발생</>;
  }
  return (
    <Comments>
      {/* <AddBox>
        <AddReply
          value={isInput}
          onChange={handleWriteComment}
          onKeyUp={handlePostComment}
        />
        <AddBtn onClick={handleSendComment}>게시</AddBtn>
      </AddBox> */}
      {commentsData?.map((comment: feedCommentType) => (
        <CommentItem key={comment.commentId} comment={comment} />
      ))}
      {moreComments && <div ref={setTarget} />}
      {commentsData && commentsData.length > 0 && hasNextPage && (
        <button onClick={() => setMoreComments(true)}>답글 더보기</button>
      )}
    </Comments>
  );
};

export default FeedComment;
