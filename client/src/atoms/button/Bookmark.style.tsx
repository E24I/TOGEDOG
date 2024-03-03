import styled from "styled-components";
import { Size } from "../atomsType";
import { ReactComponent as BookmarkFalse } from "../../assets/images/icons/BookmarkFalse.svg";
import { ReactComponent as BookmarkTrue } from "../../assets/images/icons/BookmarkTrue.svg";

export const MarkFalse = styled(BookmarkFalse)<Size>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 0px 10px;
  cursor: pointer;
  path {
    fill: rgb(200, 200, 200);
  }
  &:hover {
    path {
      fill: rgb(73, 73, 73);
    }
  }
  &:active {
    path {
      fill: rgb(73, 73, 73);
    }
  }
`;

export const MarkTrue = styled(BookmarkTrue)<Size>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: 0px 10px;
  cursor: pointer;
  &:hover {
    path {
      fill: rgb(73, 73, 73);
    }
  }
  path {
    fill: rgb(73, 73, 73);
  }
`;
