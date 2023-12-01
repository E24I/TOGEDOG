import React from "react";
import { MarkFalse, MarkTrue } from "./Bookmark.style";

interface OwnProps {
  width: string;
  height: string;
  isBookmark: boolean;
  handleCustomEvent: () => void;
}

const Bookmark: React.FC<OwnProps> = ({
  width,
  height,
  isBookmark,
  handleCustomEvent,
}) => {
  return (
    <>
      {isBookmark ? (
        <MarkTrue width={width} height={height} onClick={handleCustomEvent} />
      ) : (
        <MarkFalse width={width} height={height} onClick={handleCustomEvent} />
      )}
    </>
  );
};
export default Bookmark;
