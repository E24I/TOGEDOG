import React from "react";
import { LikeFalse, LikeTrue } from "./Heart.style";

interface OwnProps {
  width: string;
  height: string;
  isLike: boolean;
  handleCustomEvent: () => void;
}

const Heart: React.FC<OwnProps> = ({
  width,
  height,
  isLike,
  handleCustomEvent,
}) => {
  return (
    <>
      {isLike ? (
        <LikeTrue width={width} height={height} onClick={handleCustomEvent} />
      ) : (
        <LikeFalse width={width} height={height} onClick={handleCustomEvent} />
      )}
    </>
  );
};
export default Heart;
