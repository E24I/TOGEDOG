import React, { useState } from "react";
import { Unknown } from "./Feed.Style";
import { feedCommentType } from "../../types/feedDataType";
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
import {
  Comment,
  CommentContent,
  CommentContents,
  CommentEditBox,
  CommentHeader,
  CommentLeft,
  CommentNickname,
  CommentStatus,
} from "./FeedComment.style";

interface OwnProps {
  comment: feedCommentType;
}

const CommentItem: React.FC<OwnProps> = ({ comment }) => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);
  const accesstoken = useRecoilValue(tokenAtom);
  const setAlertModal = useSetRecoilState(alertAtom);

  const [isEditMode, setEditMode] = useState<boolean>(false);
  const [content, setContent] = useState<string>(comment.content);

  // 대댓글 삭제 요청 훅
  const { mutate: deleteComment } = useDeleteComment(
    comment.commentId,
    accesstoken,
    () => {
      setAlertModal("대댓글이 삭제 되었습니다.");
    },
    () => {
      setAlertModal("대댓글 삭제에 실패했습니다.");
    },
  );

  // 대댓글 수정 요청 훅
  const { mutate: patchComment } = usePatchComment(
    comment.commentId,
    content,
    accesstoken,
    () => {
      setEditMode(false);
      setAlertModal("대댓글이 수정 되었습니다.");
    },

    () => {
      setEditMode(false);
      setAlertModal("대댓글 수정에 실패했습니다.");
    },
  );

  const handleEditComment = () => setEditMode(true);
  const handleCommentDelete = () => deleteComment();

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
          <CommentStatus className="status">
            {comment?.member.memberId === myId ? (
              <>
                {!isEditMode ? (
                  <button onClick={handleEditComment}>수정</button>
                ) : (
                  <>
                    <button onClick={() => patchComment()}>확인</button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setContent(comment.content);
                      }}
                    >
                      취소
                    </button>
                  </>
                )}
                <button onClick={handleCommentDelete}>삭제</button>
              </>
            ) : (
              <button onClick={handleReportComment}>신고</button>
            )}
          </CommentStatus>
        </CommentHeader>
        {!isEditMode ? (
          <CommentContent>{comment.content}</CommentContent>
        ) : (
          <CommentEditBox
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
