import React, { useState } from "react";
import {
  Comment,
  CommentContent,
  CommentContents,
  CommentHeader,
  CommentLeft,
  CommentNickname,
  Mentions,
  Setting,
  SettingBox,
  Unknown,
} from "./Feed.Style";
import { feedCommentType } from "../../types/feedDataType";
import Dropdown from "../../atoms/dropdown/Dropdowns";
import { useDeleteComment, usePatchComment } from "../../hooks/CommentHook";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  alertAtom,
  isLoginAtom,
  memberIdAtom,
  reportAtom,
  tokenAtom,
} from "../../atoms";
import { UserImgForm } from "../../atoms/imgForm/ImgForm";
import { useNavigate } from "react-router-dom";

interface OwnProps {
  comment: feedCommentType;
}

const CommentItem: React.FC<OwnProps> = ({ comment }) => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);
  const accesstoken = useRecoilValue(tokenAtom);
  const setAlertModal = useSetRecoilState(alertAtom);

  const [isSetting, setSetting] = useState<boolean>(false);
  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [content, setContent] = useState<string>(comment.content);

  // 대댓글 삭제 요청 훅
  const { mutate: deleteComment } = useDeleteComment(
    comment.commentId,
    accesstoken,
  );

  // 대댓글 수정 요청 훅
  const { mutate: patchComment } = usePatchComment(
    comment.commentId,
    content,
    accesstoken,
    () => setEditMode(false),
    () => setEditMode(false),
  );

  const handleEditComment = () => setEditMode(true);
  const handleCommentDelete = () => deleteComment();
  const handleSetting = () => setSetting(!isSetting);
  const handleCloseDropdown = () => setSetting(false);

  // 대댓글 신고
  const [reportModal, setReportModal] = useRecoilState(reportAtom);
  const handleReportComment = () => {
    if (!isLogin) {
      return setAlertModal("로그인 후 이용해주세요.");
    }
    setReportModal({
      ...reportModal,
      sort: "comment",
      commentId: comment.commentId,
    });
  };

  const myId = useRecoilValue(memberIdAtom);
  const settingContent =
    comment?.member.memberId === myId
      ? {
          수정하기: handleEditComment,
          삭제하기: handleCommentDelete,
        }
      : {
          신고하기: handleReportComment,
        };

  // 대댓글 입력 창 onChange 이벤트
  const handleChangeComment = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);

  // 대댓글 입력 창 enter, esc 입력 시 이벤트
  const handleCommentPatch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      patchComment();
    } else if (e.key === "Escape") {
      setEditMode(false);
      setContent(comment.content);
    }
  };

  return (
    <Comment>
      <CommentLeft onClick={() => navigate(`/user/${comment.member.memberId}`)}>
        {comment.member.imageUrl ? (
          <UserImgForm
            width={50}
            height={50}
            radius={50}
            URL={comment.member.imageUrl}
          />
        ) : (
          <Unknown />
        )}
      </CommentLeft>
      <CommentContents>
        <CommentHeader>
          <CommentNickname
            onClick={() => navigate(`/user/${comment.member.memberId}`)}
          >
            {comment.member.nickname}
          </CommentNickname>
          <SettingBox onClick={handleSetting} onBlur={handleCloseDropdown}>
            <Setting />
            {isSetting && (
              <Dropdown
                setting={settingContent}
                handleCloseDropdown={handleCloseDropdown}
              />
            )}
          </SettingBox>
        </CommentHeader>
        {!isEditMode ? (
          <CommentContent>
            {comment.mention && <Mentions>{comment.mention}</Mentions>}
            {comment.content}
          </CommentContent>
        ) : (
          <input
            value={content}
            onChange={handleChangeComment}
            onKeyUp={handleCommentPatch}
          />
        )}
      </CommentContents>
    </Comment>
  );
};

export default CommentItem;
