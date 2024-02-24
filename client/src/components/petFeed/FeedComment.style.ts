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

export const AddBox = styled.div`
  border-bottom: 1px solid rgb(215, 215, 215);
  width: 90%;
  height: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export const AddReply = styled.input`
  padding: 5px 0px 5px 10px;
  width: 100%;
  height: 30px;
`;

export const AddBtn = styled.button`
  padding: 5px 15px;
  min-width: 60px;
  height: 30px;
`;

export const Comments = styled(Replies)`
  margin-bottom: 0px;
  &:hover {
    .status {
      display: flex;
      justify-content: end;
      align-items: center;
      button {
        margin: 0px 3px;
        display: block;
      }
    }
  }
`;
export const Comment = styled(Reply)``;
export const CommentLeft = styled(ReplyProfile)``;
export const CommentContents = styled(ReplyContents)``;
export const CommentHeader = styled(ReplyHeader)``;
export const CommentNickname = styled(ReplyNickname)``;
export const CommentStatus = styled.div`
  button {
    margin: 0px 3px;
    display: none;
  }
`;
export const CommentContent = styled(ReplyContent)``;
export const CommentEditBox = styled(ReplyEditBox)``;
