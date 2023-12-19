import React, { useState } from "react";
import FeedComment from "./FeedComment";
import {
  Comments,
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
import { useDeleteReply, usePatchReply } from "../../hooks/ReplyHook";
import { useRecoilValue } from "recoil";
import { tokenAtom } from "../../atoms";

interface OwnProps {
  reply: any;
}

const FeedReply: React.FC<OwnProps> = ({ reply }) => {
  const accesstoken = useRecoilValue(tokenAtom);

  const [isLike, setLike] = useState<boolean>(false);
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

  const handleLike = (): void => setLike(!isLike);
  const handleSetting = (): void => setSetting(!isSetting);
  const handleComment = (): void => setComment(!isComment);
  const handleCloseDropdown = () => setSetting(false);
  const handleEditReply = () => setEditReply(true);
  const handleReplyDelete = () => deleteReply();
  const handleReplyFix = () => console.log("성공");
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

  const settingContent = {
    수정하기: handleEditReply,
    삭제하기: handleReplyDelete,
    댓글고정: handleReplyFix,
  };

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
        <ReplyNickname>{reply.member.nickname}</ReplyNickname>
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
          <ReplyDate>20분 전</ReplyDate>
          <Heart
            width="18px"
            height="18px"
            isLike={reply.likeYn}
            handleFunc={handleLike}
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
