import React from "react";
import {
  AddBox,
  AddBtn,
  AddReply,
  Comment,
  CommentContent,
  CommentContents,
  CommentLeft,
  CommentNickname,
  Mentions,
  Unknown,
} from "./Feed.Style";

const FeedComment: React.FC = () => {
  return (
    <Comment>
      <CommentLeft>
        {/* <CommentProfile /> */}
        <Unknown />
      </CommentLeft>
      <CommentContents>
        <CommentNickname>마루언니</CommentNickname>
        <CommentContent>
          <Mentions>@세계최강 귀요미 몽자</Mentions>
          오.. 그런가요?! 마루한테도 사줘봐야겠네요~ 좋은 정보 감사합니다~ㅎㅎ
        </CommentContent>
        <AddBox>
          <AddReply placeholder="답글 달기..." />
          <AddBtn>게시</AddBtn>
        </AddBox>
      </CommentContents>
    </Comment>
  );
};

export default FeedComment;
