import React from "react";
import styled from "styled-components";
import { ReactComponent as BookmarkFalse } from "../../../assets/images/icons/BookmarkFalse.svg";
import { ReactComponent as BookmarkTrue } from "../../../assets/images/icons/BookmarkTrue.svg";

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

export type Size = {
  width: string;
  height: string;
};

export const MarkFalse = styled(BookmarkFalse)<Size>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 0px 10px;
  cursor: pointer;
  &:active {
    path {
      fill: yellow;
    }
  }
`;

export const MarkTrue = styled(BookmarkTrue)<Size>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 0px 10px;
  cursor: pointer;
  path {
    fill: yellow;
  }
`;
