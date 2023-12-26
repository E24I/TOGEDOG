import React from "react";
import { LikeFalse, LikeTrue } from "./Heart.style";

interface OwnProps {
  width: string;
  height: string;
  isLike: boolean;
  handleFunc: () => void;
}

const Heart: React.FC<OwnProps> = ({ width, height, isLike, handleFunc }) => {
  return (
    <>
      {isLike ? (
        <LikeTrue width={width} height={height} onClick={handleFunc} />
      ) : (
        <LikeFalse width={width} height={height} onClick={handleFunc} />
      )}
    </>
  );
};
export default Heart;
