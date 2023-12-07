import React from "react";
import styled from "styled-components";
import { ModalBackground } from "../../atoms/layout/Layout.style";

interface OwnProps {
  url: string;
  handleFunc: () => void;
}

const FeedImage: React.FC<OwnProps> = ({ url, handleFunc }) => {
  return (
    <ModalBackground
      onClick={(e) => {
        e.stopPropagation();
        handleFunc();
      }}
    >
      <BigImage src={url} alt="피드 이미지 확대" />
    </ModalBackground>
  );
};

export default FeedImage;

export const BigImage = styled.img`
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;
