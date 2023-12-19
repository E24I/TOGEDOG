import React, { useState } from "react";
import {
  Comment,
  CommentContent,
  CommentContents,
  CommentLeft,
  CommentNickname,
  CommentProfile,
  Mentions,
  Setting,
  SettingBox,
  Unknown,
} from "./Feed.Style";
import { feedCommentType } from "../../types/feedDataType";
import Dropdown from "../../atoms/dropdown/Dropdowns";
import { useDeleteComment, usePatchComment } from "../../hooks/CommentHook";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../atoms";

interface OwnProps {
  replyId: number;
  comment: feedCommentType;
}

const CommentItem: React.FC<OwnProps> = ({ replyId, comment }) => {
  const accesstoken = useRecoilValue(tokenAtom);

  const [isComment, setComment] = useState<boolean>(false);
  const [isEditComment, setEditComment] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [isSetting, setSetting] = useState<boolean>(false);

  const handleEditComment = () => setEditComment(true);
  const handleCommentDelete = () => deleteComment();
  const handleReportComment = () => console.log("성공");
  const handleSetting = (): void => setSetting(!isSetting);
  const handleCloseDropdown = () => setSetting(false);

  const settingContent = {
    수정하기: handleEditComment,
    삭제하기: handleCommentDelete,
    신고하기: handleReportComment,
  };

  const { mutate: deleteComment } = useDeleteComment(replyId, accesstoken);
  const { mutate: patchComment } = usePatchComment(
    replyId,
    content,
    accesstoken,
    () => setEditComment(false),
    () => setEditComment(false),
  );

  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);
  const handleCommentPatch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      patchComment();
    } else if (e.key === "Escape") {
      setEditComment(false);
      setContent("?");
    }
  };

  return (
    <Comment>
      <CommentLeft>
        {comment.member.imageUrl ? (
          <CommentProfile src={comment.member.imageUrl} alt="프로필 사진" />
        ) : (
          <Unknown />
        )}
      </CommentLeft>
      <CommentContents>
        <div>
          <CommentNickname>{comment.member.nickname}</CommentNickname>
          <SettingBox onClick={handleSetting} onBlur={handleCloseDropdown}>
            <Setting />
            {isSetting && (
              <Dropdown
                setting={settingContent}
                handleCloseDropdown={handleCloseDropdown}
              />
            )}
          </SettingBox>
        </div>
        <CommentContent>
          {comment.mention && <Mentions>{comment.mention}</Mentions>}
          {comment.content}
        </CommentContent>
      </CommentContents>
    </Comment>
  );
};

export default CommentItem;
