import React, { useState } from "react";
import FeedComment from "./FeedComment";
import {
  Comments,
  FixedReply,
  Reply,
  ReplyContent,
  ReplyContents,
  ReplyDate,
  ReplyEditBox,
  ReplyLeft,
  ReplyLikeCount,
  ReplyNickname,
  ReplyProfile,
  ReplySetting,
  Setting,
  SettingBox,
  ShowComment,
  Unknown,
} from "./Feed.Style";
import Heart from "../../atoms/button/Heart";
import Dropdown from "../../atoms/dropdown/Dropdowns";
import {
  useDeleteReply,
  useFixReply,
  useLikeReply,
  usePatchReply,
} from "../../hooks/ReplyHook";
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
  reply: any;
  feedOwnerId: number;
}

const FeedReply: React.FC<OwnProps> = ({ reply, feedOwnerId }) => {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(isLoginAtom);
  const accesstoken = useRecoilValue(tokenAtom);
  const setAlertModal = useSetRecoilState(alertAtom);

  const [isSetting, setSetting] = useState<boolean>(false);
  const [isComment, setComment] = useState<boolean>(false);
  const [isEditReply, setEditReply] = useState<boolean>(false);
  const [content, setContent] = useState<string>(reply.content);

  const { mutate: deleteReply } = useDeleteReply(reply.replyId, accesstoken);
  const { mutate: patchReply } = usePatchReply(
    reply.replyId,
    content,
    accesstoken,
    () => setEditReply(false),
    () => setEditReply(false),
  );
  const { mutate: replyLike } = useLikeReply(reply.replyId, accesstoken);
  const { mutate: replyfix } = useFixReply(reply.replyId, accesstoken);

  const handleSetting = (): void => setSetting(!isSetting);
  const handleComment = (): void => setComment(!isComment);
  const handleCloseDropdown = () => setSetting(false);
  const handleEditReply = () => setEditReply(true);
  const handleReplyDelete = () => {
    if (reply.fix) {
      return setAlertModal("고정된 댓글은 삭제할 수 없습니다.");
    }
    deleteReply();
  };
  const handleReplyFix = () => replyfix();
  const handleChangeReply = (e: React.ChangeEvent<HTMLInputElement>) =>
    setContent(e.target.value);
  const handleReplyPatch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      patchReply();
    } else if (e.key === "Escape") {
      setEditReply(false);
      setContent(reply.content);
    }
  };

  // 댓글 신고
  const [reportModal, setReportModal] = useRecoilState(reportAtom);
  const handleReplyReport = () => {
    if (!isLogin) {
      return setAlertModal("로그인 후 이용해주세요.");
    }
    setReportModal({ ...reportModal, sort: "reply", replyId: reply.replyId });
  };

  const myId = useRecoilValue(memberIdAtom);
  const settingContent =
    reply?.member.memberId === myId
      ? feedOwnerId === myId
        ? {
            수정하기: handleEditReply,
            삭제하기: handleReplyDelete,
            댓글고정: handleReplyFix,
          }
        : {
            수정하기: handleEditReply,
            삭제하기: handleReplyDelete,
          }
      : feedOwnerId === myId
      ? reply?.fix
        ? {
            신고하기: handleReplyReport,
            고정취소: handleReplyFix,
          }
        : {
            신고하기: handleReplyReport,
            댓글고정: handleReplyFix,
          }
      : {
          신고하기: handleReplyReport,
        };

  // 피드 시간 경과 계산
  const setTime = (createdAt: string) => {
    const currentDate = new Date();
    const createdDate = new Date(createdAt);
    const timeDiff = Math.floor(
      (currentDate.getTime() - createdDate.getTime()) / 1000,
    );
    const intervals = {
      년: 31536000,
      개월: 2592000,
      일: 86400,
      시간: 3600,
      분: 60,
      초: 1,
    };
    for (const [unit, seconds] of Object.entries(intervals)) {
      const diff = Math.floor(timeDiff / seconds);
      if (diff >= 1) {
        return `${diff}${unit} 전`;
      }
    }
    return "1초 전";
  };

  return (
    <Reply>
      <ReplyLeft onClick={() => navigate(`/user/${reply.member.memberId}`)}>
        {reply.member.imageUrl ? (
          <UserImgForm
            width={50}
            height={50}
            radius={50}
            URL={reply.member.imageUrl}
          />
        ) : (
          <Unknown />
        )}
      </ReplyLeft>
      <ReplyContents>
        <ReplyNickname
          onClick={() => navigate(`/user/${reply.member.memberId}`)}
        >
          {reply.member.nickname}
          {reply.fix && <FixedReply>(고정된 댓글)</FixedReply>}
        </ReplyNickname>
        {!isEditReply ? (
          <ReplyContent>{reply.content}</ReplyContent>
        ) : (
          <ReplyEditBox
            value={content}
            onChange={handleChangeReply}
            onKeyUp={handleReplyPatch}
          />
        )}
        <ReplySetting>
          <ReplyDate>{setTime(reply.createdDate)}</ReplyDate>
          <Heart
            width="18px"
            height="18px"
            isLike={reply.likeYn}
            handleFunc={replyLike}
          />
          <ReplyLikeCount>{reply.likeCount}</ReplyLikeCount>
          <SettingBox onClick={handleSetting} onBlur={handleCloseDropdown}>
            <Setting />
            {isSetting && (
              <Dropdown
                setting={settingContent}
                handleCloseDropdown={handleCloseDropdown}
              />
            )}
          </SettingBox>
        </ReplySetting>
        <ShowComment onClick={handleComment}>
          {isComment ? "└ 답글 닫기" : `└ 답글 보기(${reply.commentCount})`}
        </ShowComment>
        {isComment && (
          <>
            <FeedComment replyId={reply.replyId} />
          </>
        )}
      </ReplyContents>
    </Reply>
  );
};

export default FeedReply;
