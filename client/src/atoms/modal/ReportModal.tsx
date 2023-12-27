import React, { useState } from "react";
import { ModalBackground } from "../layout/Layout.style";
import {
  ModalContainer,
  ModalContents,
  BtnBox,
  PositiveBtn,
  NegativeBtn,
  ModalInput,
} from "./Modal.style";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { reportAtom, tokenAtom } from "../../atoms";
import { useFeedReport } from "../../hooks/FeedHook";
import { useReportReply } from "../../hooks/ReplyHook";
import { useReportComment } from "../../hooks/CommentHook";

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

  // positive 버튼 클릭 시
  const handlePositiveFunc = () => {
    switch (reportModal.sort) {
      case "feed":
        console.log("피드 신고버튼 클릭");
        reportFeed();
        return;

      case "reply":
        console.log("댓글 신고버튼 클릭");
        reportReply();
        return;

      case "comment":
        console.log("대댓글 신고버튼 클릭");
        reportComment();
        return;
    }
  };

  return (
    <ModalBackground onClick={handleResetReport}>
      <ModalContainer onClick={(e) => e.stopPropagation()}>
        <ModalContents>
          <span>신고 사유를 적어주세요.</span>
          <ModalInput value={inputValue} onChange={handleChangeInput} />
        </ModalContents>
        <BtnBox>
          <PositiveBtn onMouseUp={handlePositiveFunc}>신고 완료</PositiveBtn>
          <NegativeBtn onClick={handleResetReport}>신고 취소</NegativeBtn>
        </BtnBox>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ReportModal;
