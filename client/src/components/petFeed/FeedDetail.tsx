import React from "react";
import styled from "styled-components";

interface OwnProps {
  handleMoreReview(): void;
}

const FeedDetail: React.FC<OwnProps> = ({ handleMoreReview }) => {
  return (
    <ModalBackground onClick={handleMoreReview}>
      피드 상세 모달입니다.
    </ModalBackground>
  );
};

export default FeedDetail;

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(215, 215, 215, 50%);
  display: flex;
  justify-content: center;
  align-items: center;
`;
