import styled from "styled-components";
import { Size } from "../atomsType";
import { ReactComponent as BookmarkFalse } from "../../assets/images/icons/BookmarkFalse.svg";
import { ReactComponent as BookmarkTrue } from "../../assets/images/icons/BookmarkTrue.svg";

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
