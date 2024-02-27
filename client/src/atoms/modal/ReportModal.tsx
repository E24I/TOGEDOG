import React, { useState } from "react";
import { ModalBackground } from "../layout/Layout.style";
import {
  ReportContainer,
  ModalContents,
  BtnBox,
  SendBtn,
  CloseBtn,
  ModalInput,
} from "./Modal.style";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { reportAtom, tokenAtom } from "../../atoms";
import { useFeedReport } from "../../hooks/FeedHook";
import { useReportReply } from "../../hooks/ReplyHook";
import { useReportComment } from "../../hooks/CommentHook";
import { useReportChat } from "../../hooks/ChatHooks";

const ReportModal: React.FC = () => {
  const accesstoken = useRecoilValue(tokenAtom);
  const reportModal = useRecoilValue(reportAtom);

  const [inputValue, setInputValue] = useState<string>("");
  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  // 신고 모달 초기화
  const resetReport = useResetRecoilState(reportAtom);
  const handleResetReport = () => resetReport();

  const { mutate: reportFeed } = useFeedReport(
    reportModal.feedId,
    inputValue,
    accesstoken,
    handleResetReport,
    handleResetReport,
  );
  const { mutate: reportReply } = useReportReply(
    reportModal.replyId,
    inputValue,
    accesstoken,
    handleResetReport,
    handleResetReport,
  );
  const { mutate: reportComment } = useReportComment(
    reportModal.commentId,
    inputValue,
    accesstoken,
    handleResetReport,
    handleResetReport,
  );

  const { mutate: reportChat } = useReportChat(
    inputValue,
    reportModal.chatRoomId,
    handleResetReport,
    handleResetReport,
  );

  // positive 버튼 클릭 시
  const handlePositiveFunc = () => {
    switch (reportModal.sort) {
      case "feed":
        reportFeed();
        return;

      case "reply":
        reportReply();
        return;

      case "comment":
        reportComment();
        return;

      case "chat":
        reportChat();
        return;
    }
  };

  return (
    <ModalBackground onClick={handleResetReport}>
      <ReportContainer onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={handleResetReport}>&times;</CloseBtn>
        <ReportlTitle>
          {reportModal.sort === "feed" && <span>피드 신고</span>}
          {reportModal.sort === "reply" && <span>댓글 신고</span>}
          {reportModal.sort === "comment" && <span>대댓글 신고</span>}
          {reportModal.sort === "chat" && <span>채팅 신고</span>}
          <ModalInput value={inputValue} onChange={handleChangeInput} />
        </ReportlTitle>
        <SendBtn onMouseUp={handlePositiveFunc}>제출</SendBtn>
      </ReportContainer>
    </ModalBackground>
  );
};

export default ReportModal;
