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
import { useRecoilState, useRecoilValue } from "recoil";
import { memberIdAtom, reportAtom, tokenAtom } from "../../atoms";

interface OwnProps {
  reply: any;
}

const FeedReply: React.FC<OwnProps> = ({ reply }) => {
  const accesstoken = useRecoilValue(tokenAtom);

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
  const handleReplyDelete = () => deleteReply();
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
  const handleReplyReport = () =>
    setReportModal({ ...reportModal, sort: "reply", replyId: reply.replyId });

  const myId = useRecoilValue(memberIdAtom);
  const settingContent =
    reply?.member.memberId === myId
      ? {
          수정하기: handleEditReply,
          삭제하기: handleReplyDelete,
          댓글고정: handleReplyFix,
        }
      : {
          신고하기: handleReplyReport,
        };

  const today = new Date();
  const createDate = reply?.createdDate.split("T")[0];
  const feedDate = createDate?.split("-").map((el: string) => parseInt(el));
  const createTime = reply?.createdDate.split("T")[1];
  const feedTime = createTime?.split(":").map((el: string) => parseInt(el));

  return (
    <Reply>
      <ReplyLeft>
        {reply.member.imageUrl ? (
          <ReplyProfile src={reply.member.imageUrl} alt="프로필 사진" />
        ) : (
          <Unknown />
        )}
      </ReplyLeft>
      <ReplyContents>
        <ReplyNickname>
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
          <ReplyDate>
            {today.getFullYear() !== feedDate[0]
              ? `${today.getFullYear() - feedDate[0]}년 전`
              : today.getMonth() + 1 !== feedDate[1]
              ? `${today.getMonth() + 1 - feedDate[1]}개월 전`
              : today.getDate() !== feedDate[0]
              ? `${today.getDate() - feedDate[2]}일 전`
              : today.getHours() !== feedTime[0]
              ? `${today.getHours() - feedTime[0]}시간 전`
              : today.getMinutes() !== feedTime[1]
              ? `${today.getMinutes() - feedTime[1]}분 전`
              : `${today.getSeconds() - feedTime[2]}초 전`}
          </ReplyDate>
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
