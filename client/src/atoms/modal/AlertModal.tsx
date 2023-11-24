import React from "react";
import styled from "styled-components";
import { ModalBackground } from "../layout/Layout.style";

const AlertModal: React.FC = () => {
  return (
    <ModalBackground>
      <AlertContainer>
        <div>입력창입니다.</div>
        <div>
          <button>예</button>
          <button>아니오</button>
        </div>
      </AlertContainer>
    </ModalBackground>
  );
};

export default AlertModal;

export const AlertContainer = styled.div``;

export const AlertContents = styled.div`
  padding: 10px 0px;
  text-align: center;
`;

export const BtnBox = styled.div`
  width: 100%;
  /* max-width: px; */
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const AlertBtn = styled.button`
  width: 100%;
  /* max-width: px; */
  padding: 10px 0px;
  text-align: center;
`;
