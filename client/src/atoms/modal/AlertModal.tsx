import React from "react";
import { ModalBackground } from "../layout/Layout.style";
import {
  ModalContainer,
  ModalContents,
  BtnBox,
  CheckBtn,
  Warning,
} from "./Modal.style";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { alertAtom } from "../../atoms";

const AlertModal: React.FC = () => {
  const alertContent = useRecoilValue(alertAtom);

  // 알림 모달 초기화
  const resetAlert = useResetRecoilState(alertAtom);
  const handleResetAlert = () => resetAlert();

  return (
    <ModalBackground>
      <ModalContainer>
        <Warning />
        <ModalContents>
          <span>{alertContent}</span>
        </ModalContents>
        <BtnBox>
          <CheckBtn onClick={handleResetAlert}>확인</CheckBtn>
        </BtnBox>
      </ModalContainer>
    </ModalBackground>
  );
};

export default AlertModal;
