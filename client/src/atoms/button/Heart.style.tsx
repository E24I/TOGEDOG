import styled from "styled-components";
import { Size } from "../atomsType";
import { ReactComponent as HeartFalse } from "../../assets/images/icons/HeartFalse.svg";
import { ReactComponent as HeartTrue } from "../../assets/images/icons/HeartTrue.svg";

export const LikeFalse = styled(HeartFalse)<Size>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 0px 10px;
  cursor: pointer;
  path {
    fill: rgb(200, 200, 200);
  }
  &:hover {
    path {
      fill: rgb(231, 84, 73);
    }
  }
  &:active {
    path {
      fill: rgb(231, 84, 73);
    }
  }
`;

export const LikeTrue = styled(HeartTrue)<Size>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 0px 10px;
  cursor: pointer;
  path {
    fill: rgb(231, 84, 73);
  }
  &:hover {
    path {
      fill: rgb(231, 84, 73);
    }
  }
  &:active {
    path {
      fill: rgb(231, 84, 73);
    }
  }
`;
