import React from "react";
import styled from "styled-components";
import { ReactComponent as HeartFalse } from "../../../assets/images/icons/HeartFalse.svg";
import { ReactComponent as HeartTrue } from "../../../assets/images/icons/HeartTrue.svg";

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

export type Size = {
  width: string;
  height: string;
};

export const LikeFalse = styled(HeartFalse)<Size>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 0px 10px;
  cursor: pointer;
  &:active {
    path {
      fill: red;
    }
  }
`;

export const LikeTrue = styled(HeartTrue)<Size>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 0px 10px;
  cursor: pointer;
  path {
    fill: red;
  }
`;
