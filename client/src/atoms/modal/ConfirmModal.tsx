import React from "react";
import { ModalBackground } from "../layout/Layout.style";
import {
  ModalContainer,
  ModalContents,
  BtnBox,
  PositiveBtn,
  NegativeBtn,
} from "./Modal.style";

interface OwnProps {
  confirmContent: string;
  positiveContent: string;
  negativeContent: string;
  handlePositiveFunc: () => void;
  handleNegativeFunc: () => void;
}

const ConfirmModal: React.FC<OwnProps> = ({
  confirmContent,
  positiveContent,
  negativeContent,
  handlePositiveFunc,
  handleNegativeFunc,
}) => {
  return (
    <ModalBackground>
      <ModalContainer>
        <ModalContents>
          <span>{confirmContent}</span>
        </ModalContents>
        <BtnBox>
          <PositiveBtn onClick={handlePositiveFunc}>
            {positiveContent}
          </PositiveBtn>
          <NegativeBtn onClick={handleNegativeFunc}>
            {negativeContent}
          </NegativeBtn>
        </BtnBox>
      </ModalContainer>
    </ModalBackground>
  );
};

export default ConfirmModal;
