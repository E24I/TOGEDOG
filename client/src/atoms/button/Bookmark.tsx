import React from "react";
import { MarkFalse, MarkTrue } from "./Bookmark.style";

interface OwnProps {
  width: string;
  height: string;
  isBookmark: boolean;
  handleFunc: () => void;
}

const Bookmark: React.FC<OwnProps> = ({
  width,
  height,
  isBookmark,
  handleFunc,
}) => {
  return (
    <>
      {isBookmark ? (
        <MarkTrue width={width} height={height} onClick={handleFunc} />
      ) : (
        <MarkFalse width={width} height={height} onClick={handleFunc} />
      )}
    </>
  );
};
export default Bookmark;
