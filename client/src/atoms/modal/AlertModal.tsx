import React from "react";
import { ModalBackground } from "../layout/Layout.style";
import { ModalContainer, ModalContents, BtnBox, CheckBtn } from "./Modal.style";

interface OwnProps {
  alertHeader: string;
  checkContent: string;
  handleFunc: () => void;
}

const AlertModal: React.FC<OwnProps> = ({
  alertHeader,
  checkContent,
  handleFunc,
}) => {
  // Modal 창을 열고 닫는 아래 useState를 추가해주세요.
  // const [isModal, setModal] = useState<boolean>(false);
  // const handleFunc = () => setModal(false)

  return (
    <ModalBackground>
      <ModalContainer>
        <ModalContents>
          <span>{alertHeader}</span>
        </ModalContents>
        <BtnBox>
          <CheckBtn onClick={handleFunc}>{checkContent}</CheckBtn>
        </BtnBox>
      </ModalContainer>
    </ModalBackground>
  );
};

export default AlertModal;
