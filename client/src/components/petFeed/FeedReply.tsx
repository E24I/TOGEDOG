import React, { useState } from "react";
import FeedComment from "./FeedComment";
import {
  Comments,
  Reply,
  ReplyContent,
  ReplyContents,
  ReplyDate,
  ReplyLeft,
  ReplyLikeCount,
  ReplyNickname,
  ReplySetting,
  Setting,
  SettingBox,
  ShowComment,
  Unknown,
} from "./Feed.Style";
import Heart from "../../atoms/button/Heart";
import Dropdown from "../../atoms/dropdown/Dropdowns";
import { useDeleteReply } from "../../hooks/ReplyHook";
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

  const handleLike = (): void => setLike(!isLike);
  const handleSetting = (): void => setSetting(!isSetting);
  const handleComment = (): void => setComment(!isComment);

  const { mutate: deleteReply } = useDeleteReply(reply.replyId, accesstoken);

  const handleReplyPatch = () => {
    return;
  };
  const handleReplyDelete = () => {
    deleteReply();
    return;
  };
  const handleReplyFix = () => {
    return;
  };
  const settingContent = {
    수정하기: handleReplyPatch,
    삭제하기: handleReplyDelete,
    댓글고정: handleReplyFix,
  };
  const handleCloseDropdown = () => setSetting(false);

  const [isContent, setContent] = useState(reply.content);

  return (
    <Reply>
      <ReplyLeft>
        {/* <ReplyProfile /> */}
        <Unknown />
      </ReplyLeft>
      <ReplyContents>
        <ReplyNickname>{reply.member.nickname}</ReplyNickname>
        <ReplyContent>{reply.content}</ReplyContent>
        <input value={isContent} />
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
            <Comments>
              <FeedComment />
            </Comments>
          </>
        )}
      </ReplyContents>
    </Reply>
  );
};

export default FeedReply;
