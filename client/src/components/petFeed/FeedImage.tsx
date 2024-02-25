import React from "react";
import { ImageBackground, BigImage } from "./FeedImage.style";

interface OwnProps {
  url: string;
  handleFunc: () => void;
}

const FeedImage: React.FC<OwnProps> = ({ url, handleFunc }) => {
  const image = new Image();
  image.src = url;
  const width = image.width;
  const height = image.height;
  const compareLength = width > height;

  return (
    <ImageBackground
      onClick={(e) => {
        e.stopPropagation();
        handleFunc();
      }}
    >
      <BigImage compare={compareLength} src={url} alt="피드 이미지 확대" />
    </ImageBackground>
  );
};

export default FeedImage;
