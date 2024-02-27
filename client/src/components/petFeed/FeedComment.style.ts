import styled from "styled-components";
import {
  Replies,
  Reply,
  ReplyContent,
  ReplyContents,
  ReplyProfile,
  ReplyNickname,
  ReplyEditBox,
  ReplyHeader,
} from "./FeedReply.style";

export const Comments = styled(Replies)`
  margin: 15px 0px;
  padding-bottom: 0px;
`;
export const Comment = styled(Reply)`
  border-bottom: none;
`;
export const CommentLeft = styled(ReplyProfile)``;
export const CommentContents = styled(ReplyContents)``;
export const CommentHeader = styled(ReplyHeader)``;
export const CommentNickname = styled(ReplyNickname)``;
export const CommentStatus = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  button {
    margin: 0px 3px;
    color: ${({ theme }) => theme.feed_color};
  }
`;
export const CommentContent = styled(ReplyContent)``;
export const CommentEditBox = styled(ReplyEditBox)``;
